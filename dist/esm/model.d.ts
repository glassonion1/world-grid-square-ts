/**
 * size of one grid
 */
export declare const Unit: {
    readonly lng: 1;
    readonly lat: number;
};
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
export declare const parseFirstDigit: (code: string) => number[];
export declare const toLength: (level: number) => number;
export declare const toLevel: (code: string) => number;
//# sourceMappingURL=model.d.ts.map