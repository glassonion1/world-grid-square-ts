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
const toLv1 = (code) => {
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
const toLv2 = (code) => {
    const lv1 = toLv1(code);
    return toGrid(lv1, 2, 8);
};
const toLv3 = (code) => {
    const lv2 = toLv2(code);
    return toGrid(lv2, 3, 10);
};
const toLv4 = (code) => {
    const lv3 = toLv3(code);
    return toGrid(lv3, 4, 2);
};
const toLv5 = (code) => {
    const lv4 = toLv4(code);
    return toGrid(lv4, 5, 2);
};
const toLv6 = (code) => {
    const lv5 = toLv5(code);
    return toGrid(lv5, 6, 2);
};
const toExt25 = (code) => {
    const lv6 = toLv6(code);
    return toGrid(lv6, 7, 5);
};
const toExt12 = (code) => {
    const ext25 = toExt25(code);
    return toGrid(ext25, 8, 2);
};
const toExt5 = (code) => {
    const ext25 = toExt25(code);
    return toGrid(ext25, 9, 5);
};
/**
 * Returns longitude and latitude from the grid square code.
 *
 * @param code - the grid square code
 * @param anchorX - anchor point of longitude
 * @param anchorY - anchor point of latitude
 * @returns Point object
 */
const toPoint = (code, anchorX = 0.0, anchorY = 0.0) => {
    code = code.replaceAll('-', '');
    const funcs = {
        1: toLv1,
        2: toLv2,
        3: toLv3,
        4: toLv4,
        5: toLv5,
        6: toLv6,
        7: toExt25,
        8: toExt12,
        9: toExt5
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
