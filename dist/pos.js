"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jisCodeToBbox = exports.toBbox = exports.jisCodeToPoint = exports.toPoint = void 0;
const model_1 = require("./model");
const toGrid = (grid, level, divide) => {
    const len = (0, model_1.toLength)(level);
    const code = grid.code;
    let y = Number(code[len - 2]);
    let x = Number(code[len - 1]);
    if (divide == 2) {
        const c = Number(code[len - 1]) - 1;
        y = Math.trunc(c / 2);
        x = c % 2;
    }
    const h = grid.height / divide;
    const w = grid.width / divide;
    const [signX, signY] = (0, model_1.parseFirstDigit)(code);
    const originLat = grid.originLat + y * h * signY;
    const originLng = grid.originLng + x * w * signX;
    return {
        originLng: originLng,
        originLat: originLat,
        width: w,
        height: h,
        code: code
    };
};
const toLv1Pos = (code) => {
    const [signX, signY, z] = (0, model_1.parseFirstDigit)(code);
    const y = Number(code.substring(1, 4));
    const x = Number(code.substring(4, 6));
    const originLat = y * model_1.Unit.lat * signY;
    const originLng = (x * model_1.Unit.lng + 100 * z) * signX;
    return {
        originLng: originLng,
        originLat: originLat,
        width: model_1.Unit.lng,
        height: model_1.Unit.lat,
        code: code
    };
};
const toLv2Pos = (code) => {
    const lv1 = toLv1Pos(code);
    return toGrid(lv1, 2, 8);
};
const toLv3Pos = (code) => {
    const lv2 = toLv2Pos(code);
    return toGrid(lv2, 3, 10);
};
const toLv4Pos = (code) => {
    const lv3 = toLv3Pos(code);
    return toGrid(lv3, 4, 2);
};
const toLv5Pos = (code) => {
    const lv4 = toLv4Pos(code);
    return toGrid(lv4, 5, 2);
};
const toLv6Pos = (code) => {
    const lv5 = toLv5Pos(code);
    return toGrid(lv5, 6, 2);
};
// Ext100 is not provided because the code cannot be distinguished from lv6.
const toExt100Pos = (code) => {
    const lv4 = toLv4Pos(code);
    return toGrid(lv4, 6, 5);
};
const toExt50Pos = (code) => {
    const ext100 = toExt100Pos(code);
    return toGrid(ext100, 7, 2);
};
const toExt10Pos = (code) => {
    const ext50 = toExt50Pos(code);
    return toGrid(ext50, 8, 5);
};
const toExt5Pos = (code) => {
    const ext10 = toExt10Pos(code);
    return toGrid(ext10, 9, 2);
};
/**
 * Returns longitude and latitude from the grid square code.
 *
 * @param code - the grid square code
 * @param anchorX - anchor point of longitude
   @param anchorY - anchor point of latitude
 * @returns Point object
 */
const toPoint = (code, anchorX = 0.0, anchorY = 0.0) => {
    code = code.replaceAll('-', '');
    const funcs = {
        1: toLv1Pos,
        2: toLv2Pos,
        3: toLv3Pos,
        4: toLv4Pos,
        5: toLv5Pos,
        6: toLv6Pos,
        7: toExt50Pos,
        8: toExt10Pos,
        9: toExt5Pos
    };
    const level = (0, model_1.toLevel)(code);
    const func = funcs[level];
    const g = func(code);
    const digit = 14;
    const originLng = Math.trunc(g.originLng * Math.pow(10, digit)) / Math.pow(10, digit);
    const originLat = Math.trunc(g.originLat * Math.pow(10, digit)) / Math.pow(10, digit);
    const [signX, signY] = (0, model_1.parseFirstDigit)(code);
    if (signX < 0) {
        anchorX -= 1;
    }
    if (signY < 0) {
        anchorY -= 1;
    }
    const lng = originLng + anchorX * g.width;
    const lat = originLat + anchorY * g.height;
    return { lng: lng, lat: lat };
};
exports.toPoint = toPoint;
/**
 * Returns longitude and latitude from the jis grid square code.
 *
 * @param code - the jis grid square code
 * @param anchorX - anchor point of longitude
   @param anchorY - anchor point of latitude
 * @returns Point object
 */
const jisCodeToPoint = (code, anchorX = 0.0, anchorY = 0.0) => {
    return (0, exports.toPoint)(`20${code}`, anchorX, anchorY);
};
exports.jisCodeToPoint = jisCodeToPoint;
/**
 * Returns bounding box from the grid square code.
 *
 * @param code - the grid square code
 * @returns Bbox object
 */
const toBbox = (code) => {
    const ws = (0, exports.toPoint)(code, 0, 0);
    const en = (0, exports.toPoint)(code, 1, 1);
    return {
        west: ws.lng,
        south: ws.lat,
        east: en.lng,
        north: en.lat
    };
};
exports.toBbox = toBbox;
/**
 * Returns bounding box from the jis grid square code.
 *
 * @param code - the jis grid square code
 * @returns Bbox object
 */
const jisCodeToBbox = (code) => {
    return (0, exports.toBbox)(`20${code}`);
};
exports.jisCodeToBbox = jisCodeToBbox;
