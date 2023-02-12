"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBbox = exports.toPoint = exports.toLevel = exports.toCode = void 0;
var code_1 = require("./code");
Object.defineProperty(exports, "toCode", { enumerable: true, get: function () { return code_1.toCode; } });
var model_1 = require("./model");
Object.defineProperty(exports, "toLevel", { enumerable: true, get: function () { return model_1.toLevel; } });
var pos_1 = require("./pos");
Object.defineProperty(exports, "toPoint", { enumerable: true, get: function () { return pos_1.toPoint; } });
Object.defineProperty(exports, "toBbox", { enumerable: true, get: function () { return pos_1.toBbox; } });
const code_2 = require("./code");
const model_2 = require("./model");
const pos_2 = require("./pos");
const wgs = {
    toCode: code_2.toCode,
    toJisCode: code_2.toJisCode,
    toPoint: pos_2.toPoint,
    toBbox: pos_2.toBbox,
    jisCodeToPoint: pos_2.jisCodeToPoint,
    jisCodeToBbox: pos_2.jisCodeToBbox,
    toLevel: model_2.toLevel
};
exports.default = wgs;
