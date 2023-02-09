"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBbox = exports.toPoint = void 0;
const model_1 = require("./model");
const toGrid = (grid, level, divide) => {
    const len = (0, model_1.toLength)(level);
    const code = grid.code;
    let y = Number(code[len - 2]);
    let x = Number(code[len - 1]);
    if (divide == 2) {
        const c = Number(code[len - 1]) - 1;
        y = Math.floor(c / 2);
        x = c % 2;
    }
    const h = grid.height / divide;
    const w = grid.width / divide;
    const south = grid.south + y * h;
    const west = grid.west + x * w;
    return {
        west: west,
        south: south,
        width: w,
        height: h,
        code: code
    };
};
const xyz = (code) => {
    const o = Number(code[0]);
    const z = (o - 1) % 2;
    const x = ((o - z - 1) / 2) % 2;
    const y = (o - 2 * x - z - 1) / 4;
    return [x, y, z];
};
const toLv1Pos = (code) => {
    const [x, y, z] = xyz(code);
    const codeY = (1 - 2 * y) * Number(code.substring(1, 4));
    const codeX = (1 - 2 * x) * Number(code.substring(4, 6));
    const south = codeY * model_1.Unit.lat;
    const west = codeX * model_1.Unit.lng + 100 * z;
    return {
        west: west,
        south: south,
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
const toPoint = (code, anchorX = 0.0, anchorY = 0.0) => {
    const funcs = {
        1: toLv1Pos,
        2: toLv2Pos,
        3: toLv3Pos,
        4: toLv4Pos,
        5: toLv5Pos,
        6: toLv6Pos
    };
    const level = (0, model_1.toLevel)(code);
    const func = funcs[level];
    const g = func(code);
    const digit = 14;
    const w = Math.trunc(g.west * Math.pow(10, digit)) / Math.pow(10, digit);
    const s = Math.trunc(g.south * Math.pow(10, digit)) / Math.pow(10, digit);
    const [x, y] = xyz(code);
    const lng = w + anchorX * g.width * (1 - 2 * x);
    const lat = s + anchorY * g.height * (1 - 2 * y);
    return { lng: lng, lat: lat };
};
exports.toPoint = toPoint;
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
