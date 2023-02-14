"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLevel = exports.toLength = exports.parseFirstDigit = exports.Unit = void 0;
/**
 * size of one grid
 */
exports.Unit = {
    lng: 1,
    lat: 40 / 60
};
const parseFirstDigit = (code) => {
    const o = Number(code[0]);
    const z = (o - 1) % 2;
    const x = ((o - z - 1) / 2) % 2;
    const y = (o - 2 * x - z - 1) / 4;
    const signX = 1 - 2 * x;
    const signY = 1 - 2 * y;
    return [signX, signY, z];
};
exports.parseFirstDigit = parseFirstDigit;
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
        case 7:
            return 15;
        case 8:
            return 16;
        case 9:
            return 17;
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
        case 15:
            return 7;
        case 16:
            return 8;
        case 17:
            return 9;
    }
    throw new Error(`Unsupported code: ${code}`);
};
exports.toLevel = toLevel;
