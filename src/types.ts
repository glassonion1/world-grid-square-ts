/**
 * size of one grid
 */
export const Unit = {
	lng: 1,
	lat: 40 / 60,
} as const;

/**
 * Grid
 *
 * @remarks
 * For east longitude and north latitude, the origin is west south.
 * For west longitude and north latitude, the origin is east south.
 * For east longitude and south latitude, the origin is west north.
 * For west longitude and south latitude, the origin is east north.
 */
export interface Grid {
	/** longitude to be used as the basis for calculation */
	originLng: number;
	/** latitude to be used as the basis for calculation */
	originLat: number;
	/** width of a grid */
	width: number;
	/** height of a grid */
	height: number;
	/** encoded code */
	code: string;
}

/**
 * Bounding Box
 */
export interface Bbox {
	west: number;
	south: number;
	east: number;
	north: number;
}

/**
 * Point
 */
export interface Point {
	lng: number;
	lat: number;
}

export const toLength = (level: number): number => {
	switch (level) {
		case 1:
			return 6;
		case 2:
			return 8;
		case 3:
			return 10;
		case 4:
			return 11;
		case 5:
			return 12;
		case 6:
			return 13;
		case 7:
			return 15;
		case 8:
			return 16;
		case 9:
			return 17;
	}
	throw new Error(`Unsupported level: ${level}`);
};
