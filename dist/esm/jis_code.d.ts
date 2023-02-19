import { Bbox, Point } from './model';
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
 * Returns bounding box from the jis grid square code.
 *
 * @param code - the jis grid square code
 * @returns Bbox object
 */
export declare const jisCodeToBbox: (code: string) => Bbox;
/**
 * Returns the jis grid square code from longitude and latitude.
 *
 * @param lng - longitude
 * @param lat - latitude
 * @returns the jis grid square code
 */
export declare const pointToJisCode: (lng: number, lat: number, level: number) => string;
//# sourceMappingURL=jis_code.d.ts.map