"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointToJisCode = exports.jisCodeToBbox = exports.jisCodeToPoint = void 0;
const code_1 = require("./code");
const point_1 = require("./point");
/**
 * Returns longitude and latitude from the jis grid square code.
 *
 * @param code - the jis grid square code
 * @param anchorX - anchor point of longitude
   @param anchorY - anchor point of latitude
 * @returns Point object
 */
const jisCodeToPoint = (code, anchorX = 0.0, anchorY = 0.0) => {
    return (0, code_1.codeToPoint)(`20${code}`, anchorX, anchorY);
};
exports.jisCodeToPoint = jisCodeToPoint;
/**
 * Returns bounding box from the jis grid square code.
 *
 * @param code - the jis grid square code
 * @returns Bbox object
 */
const jisCodeToBbox = (code) => {
    return (0, code_1.codeToBbox)(`20${code}`);
};
exports.jisCodeToBbox = jisCodeToBbox;
/**
 * Returns the jis grid square code from longitude and latitude.
 *
 * @param lng - longitude
 * @param lat - latitude
 * @returns the jis grid square code
 */
const pointToJisCode = (lng, lat, level) => {
    if (lng < 100 || 180 <= lng) {
        throw new RangeError(`Longitude is out of bound: ${lng}`);
    }
    if (lat < 0 || 66.66 <= lat) {
        throw new RangeError(`Latitude is out of bound: ${lat}`);
    }
    return (0, point_1.pointToCode)(lng, lat, level).slice(2);
};
exports.pointToJisCode = pointToJisCode;
