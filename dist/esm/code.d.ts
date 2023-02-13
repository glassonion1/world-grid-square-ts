import { Level } from './model';
export declare const toFirstDigit: (lng: number, lat: number) => number;
/**
 * Returns the grid square code from longitude and latitude.
 *
 * @param lng - longitude
 * @param lat - latitude
 * @param level - zoom level 1 to 10
 * @returns the grid square code
 */
export declare const toCode: (lng: number, lat: number, level: Level) => string;
/**
 * Returns the jis grid square code from longitude and latitude.
 *
 * @param lng - longitude
 * @param lat - latitude
 * @returns the jis grid square code
 */
export declare const toJisCode: (lng: number, lat: number, level: Level) => string;
//# sourceMappingURL=code.d.ts.map