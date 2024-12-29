import { type Bbox, type Grid, type Point, Unit, toLength } from "./types";

const divideGrid = (parent: Grid, level: number, divide: number): Grid => {
	const len = toLength(level);
	const code = parent.code;

	let y = Number(code[len - 2]);
	let x = Number(code[len - 1]);
	if (divide === 2) {
		const c = Number(code[len - 1]) - 1;
		y = Math.trunc(c / 2);
		x = c % 2;
	}

	const h = parent.height / divide;
	const w = parent.width / divide;

	const [signX, signY] = parseFirstDigit(code);

	const originLat = parent.originLat + y * h * signY;
	const originLng = parent.originLng + x * w * signX;

	return {
		originLng: originLng,
		originLat: originLat,
		width: w,
		height: h,
		code: code,
	};
};

const toLv1 = (code: string): Grid => {
	const [signX, signY, z] = parseFirstDigit(code);

	const y = Number(code.substring(1, 4));
	const x = Number(code.substring(4, 6));

	const originLat = y * Unit.lat * signY;
	const originLng = (x * Unit.lng + 100 * z) * signX;

	return {
		originLng: originLng,
		originLat: originLat,
		width: Unit.lng,
		height: Unit.lat,
		code: code,
	};
};

const toLv2 = (code: string): Grid => {
	const lv1 = toLv1(code);
	return divideGrid(lv1, 2, 8);
};

const toLv3 = (code: string): Grid => {
	const lv2 = toLv2(code);
	return divideGrid(lv2, 3, 10);
};

const toLv4 = (code: string): Grid => {
	const lv3 = toLv3(code);
	return divideGrid(lv3, 4, 2);
};

const toLv5 = (code: string): Grid => {
	const lv4 = toLv4(code);
	return divideGrid(lv4, 5, 2);
};

const toLv6 = (code: string): Grid => {
	const lv5 = toLv5(code);
	return divideGrid(lv5, 6, 2);
};

const toExt25 = (code: string): Grid => {
	const lv6 = toLv6(code);
	return divideGrid(lv6, 7, 5);
};

const toExt12 = (code: string): Grid => {
	const ext25 = toExt25(code);
	return divideGrid(ext25, 8, 2);
};

const toExt5 = (code: string): Grid => {
	const ext25 = toExt25(code);
	return divideGrid(ext25, 9, 5);
};

export const parseFirstDigit = (code: string): number[] => {
	const o = Number(code[0]);
	const z = (o - 1) % 2;
	const x = ((o - z - 1) / 2) % 2;
	const y = (o - 2 * x - z - 1) / 4;

	const signX = 1 - 2 * x;
	const signY = 1 - 2 * y;

	return [signX, signY, z];
};

export const codeToLevel = (code: string): number => {
	switch (code.length) {
		case 6:
			return 1;
		case 8:
			return 2;
		case 10:
			return 3;
		case 11:
			return 4;
		case 12:
			return 5;
		case 13:
			return 6;
		case 15:
			return 7;
		case 16:
			return 8;
		case 17:
			return 9;
	}
	throw new Error(`Unsupported code: ${code}`);
};

/**
 * Returns longitude and latitude from the grid square code.
 *
 * @param code - the grid square code
 * @param anchorX - anchor point of longitude
 * @param anchorY - anchor point of latitude
 * @returns Point object
 */
export const codeToPoint = (
	code: string,
	anchorX = 0.0,
	anchorY = 0.0,
): Point => {
	const replaced = code.replaceAll("-", "");
	const funcs: { [key: number]: (code: string) => Grid } = {
		1: toLv1,
		2: toLv2,
		3: toLv3,
		4: toLv4,
		5: toLv5,
		6: toLv6,
		7: toExt25,
		8: toExt12,
		9: toExt5,
	};

	const level = codeToLevel(replaced);

	const func = funcs[level];

	const g = func(replaced);

	const digit = 14;
	const originLng = Math.trunc(g.originLng * 10 ** digit) / 10 ** digit;
	const originLat = Math.trunc(g.originLat * 10 ** digit) / 10 ** digit;

	const [signX, signY] = parseFirstDigit(replaced);

	let x = anchorX;
	let y = anchorY;
	if (signX < 0) {
		x -= 1;
	}

	if (signY < 0) {
		y -= 1;
	}

	const lng = originLng + x * g.width;
	const lat = originLat + y * g.height;

	return { lng: lng, lat: lat };
};

/**
 * Returns bounding box from the grid square code.
 *
 * @param code - the grid square code
 * @returns Bbox object
 */
export const codeToBbox = (code: string): Bbox => {
	const ws = codeToPoint(code, 0, 0);
	const en = codeToPoint(code, 1, 1);

	return {
		west: ws.lng,
		south: ws.lat,
		east: en.lng,
		north: en.lat,
	};
};
