"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLevel = exports.toLength = exports.toXyz = exports.Unit = void 0;
exports.Unit = {
    lng: 1,
    lat: 40 / 60
};
const toXyz = (code) => {
    const o = Number(code[0]);
    const z = (o - 1) % 2;
    const x = ((o - z - 1) / 2) % 2;
    const y = (o - 2 * x - z - 1) / 4;
    return [x, y, z];
};
exports.toXyz = toXyz;
const toLength = (level) => {
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
    }
    throw new Error(`Unsupported level: ${level}`);
};
exports.toLength = toLength;
const toLevel = (code) => {
    switch (code.length) {
        case 6:
            return 1;
        case 8:
            return 2;
        case 10:
            return 3;
        case 11:
            return 4;
        case 12:
            return 5;
        case 13:
            return 6;
    }
    throw new Error(`Unsupported code: ${code}`);
};
exports.toLevel = toLevel;
