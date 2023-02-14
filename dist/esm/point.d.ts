import { Point, Bbox } from './model';
/**
 * Returns longitude and latitude from the grid square code.
 *
 * @param code - the grid square code
 * @param anchorX - anchor point of longitude
   @param anchorY - anchor point of latitude
 * @returns Point object
 */
export declare const toPoint: (code: string, anchorX?: number, anchorY?: number) => Point;
/**
 * Returns longitude and latitude from the jis grid square code.
 *
 * @param code - the jis grid square code
 * @param anchorX - anchor point of longitude
   @param anchorY - anchor point of latitude
 * @returns Point object
 */
export declare const jisCodeToPoint: (code: string, anchorX?: number, anchorY?: number) => Point;
/**
 * Returns bounding box from the grid square code.
 *
 * @param code - the grid square code
 * @returns Bbox object
 */
export declare const toBbox: (code: string) => Bbox;
/**
 * Returns bounding box from the jis grid square code.
 *
 * @param code - the jis grid square code
 * @returns Bbox object
 */
export declare const jisCodeToBbox: (code: string) => Bbox;
//# sourceMappingURL=point.d.ts.map