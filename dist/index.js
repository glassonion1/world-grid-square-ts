"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointToJisCode = exports.jisCodeToPoint = exports.jisCodeToBbox = exports.codeToLevel = exports.codeToBbox = exports.codeToPoint = exports.pointToCode = void 0;
var point_1 = require("./point");
Object.defineProperty(exports, "pointToCode", { enumerable: true, get: function () { return point_1.pointToCode; } });
var code_1 = require("./code");
Object.defineProperty(exports, "codeToPoint", { enumerable: true, get: function () { return code_1.codeToPoint; } });
Object.defineProperty(exports, "codeToBbox", { enumerable: true, get: function () { return code_1.codeToBbox; } });
Object.defineProperty(exports, "codeToLevel", { enumerable: true, get: function () { return code_1.codeToLevel; } });
var jis_code_1 = require("./jis_code");
Object.defineProperty(exports, "jisCodeToBbox", { enumerable: true, get: function () { return jis_code_1.jisCodeToBbox; } });
Object.defineProperty(exports, "jisCodeToPoint", { enumerable: true, get: function () { return jis_code_1.jisCodeToPoint; } });
Object.defineProperty(exports, "pointToJisCode", { enumerable: true, get: function () { return jis_code_1.pointToJisCode; } });
const point_2 = require("./point");
const code_2 = require("./code");
const jis_code_2 = require("./jis_code");
const wgs = {
    pointToCode: point_2.pointToCode,
    pointToJisCode: jis_code_2.pointToJisCode,
    codeToPoint: code_2.codeToPoint,
    codeToBbox: code_2.codeToBbox,
    jisCodeToPoint: jis_code_2.jisCodeToPoint,
    jisCodeToBbox: jis_code_2.jisCodeToBbox,
    codeToLevel: code_2.codeToLevel
};
exports.default = wgs;
