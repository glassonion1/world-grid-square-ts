import { Point, Bbox } from './model';
export declare const parseFirstDigit: (code: string) => number[];
export declare const codeToLevel: (code: string) => number;
/**
 * Returns longitude and latitude from the grid square code.
 *
 * @param code - the grid square code
 * @param anchorX - anchor point of longitude
 * @param anchorY - anchor point of latitude
 * @returns Point object
 */
export declare const codeToPoint: (code: string, anchorX?: number, anchorY?: number) => Point;
/**
 * Returns bounding box from the grid square code.
 *
 * @param code - the grid square code
 * @returns Bbox object
 */
export declare const codeToBbox: (code: string) => Bbox;
//# sourceMappingURL=code.d.ts.map