import { parseFirstDigit } from "./code";
import { type Grid, Unit } from "./types";

export const toFirstDigit = (lng: number, lat: number): number => {
	if (lng <= -180 || 180 < lng) {
		throw new RangeError(`Longitude is out of bound: ${lng}`);
	}

	if (lat < -90 || 90 < lat) {
		throw new RangeError(`Latitude is out of bound: ${lat}`);
	}

	const x = lng > 0 ? 0 : 1;
	const y = lat > 0 ? 0 : 1;
	const z = -100 < lng && lng <= 100 ? 0 : 1;

	return 2 * x + 4 * y + z + 1;
};

const divideGrid = (
	lng: number,
	lat: number,
	parent: Grid,
	divide: number,
): Grid => {
	const h = parent.height / divide;
	const w = parent.width / divide;

	const codey = Math.abs(Math.trunc((lat - parent.originLat) / h));
	const codex = Math.abs(Math.trunc((lng - parent.originLng) / w));

	let end = `${codey}${codex}`;
	if (divide === 2) {
		// south-west=1, south-east=2, north-west=3, north-east=4
		end = `${2 * codey + codex + 1}`;
	}

	const code = `${parent.code}${end}`;

	const [signX, signY] = parseFirstDigit(code);

	const originLat = parent.originLat + codey * h * signY;
	const originLng = parent.originLng + codex * w * signX;

	return {
		originLng: originLng,
		originLat: originLat,
		width: w,
		height: h,
		code: code,
	};
};

const toLv1 = (lng: number, lat: number): Grid => {
	const o = toFirstDigit(lng, lat);

	const h = Unit.lat;

	const p = Math.trunc(Math.abs(lat) / h);
	const padP = String(p).padStart(3, "0");

	// Extract the last two digits of the integer part
	const u = Math.trunc(Math.abs(lng)) % 100;
	const padU = String(u).padStart(2, "0");

	const code = `${o}${padP}${padU}`;

	const originLat = Math.trunc(lat / h) * h;
	const originLng = Math.trunc(lng);

	return {
		originLng: originLng,
		originLat: originLat,
		width: Unit.lng,
		height: h,
		code: code,
	};
};

const toLv2 = (lng: number, lat: number): Grid => {
	const lv1 = toLv1(lng, lat);

	return divideGrid(lng, lat, lv1, 8);
};

const toLv3 = (lng: number, lat: number): Grid => {
	const lv2 = toLv2(lng, lat);

	return divideGrid(lng, lat, lv2, 10);
};

const toLv4 = (lng: number, lat: number): Grid => {
	const lv3 = toLv3(lng, lat);

	return divideGrid(lng, lat, lv3, 2);
};

const toLv5 = (lng: number, lat: number): Grid => {
	const lv4 = toLv4(lng, lat);

	return divideGrid(lng, lat, lv4, 2);
};

const toLv6 = (lng: number, lat: number): Grid => {
	const lv5 = toLv5(lng, lat);

	return divideGrid(lng, lat, lv5, 2);
};

const toExt25 = (lng: number, lat: number): Grid => {
	const lv6 = toLv6(lng, lat);

	return divideGrid(lng, lat, lv6, 5);
};

const toExt12 = (lng: number, lat: number): Grid => {
	const ext25 = toExt25(lng, lat);

	return divideGrid(lng, lat, ext25, 2);
};

const toExt5 = (lng: number, lat: number): Grid => {
	const ext25 = toExt25(lng, lat);

	return divideGrid(lng, lat, ext25, 5);
};

/**
 * Returns the grid square code from longitude and latitude.
 *
 * @param lng - longitude
 * @param lat - latitude
 * @param level - zoom level 1 to 9
 * @returns the grid square code
 */
export const pointToCode = (
	lng: number,
	lat: number,
	level: number,
): string => {
	if (level < 1 || level > 9) {
		throw new Error(`Unsupported level: ${level}`);
	}

	const funcs: { [key: number]: (lng: number, lat: number) => Grid } = {
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

	const func = funcs[level];

	return func(lng, lat).code;
};
