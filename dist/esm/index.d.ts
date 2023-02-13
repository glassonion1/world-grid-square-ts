export { toCode } from './code';
export { toLevel } from './model';
export { toPoint, toBbox } from './pos';
declare const wgs: {
    readonly toCode: (lng: number, lat: number, level: import("./model").Level) => string;
    readonly toJisCode: (lng: number, lat: number, level: import("./model").Level) => string;
    readonly toPoint: (code: string, anchorX?: number, anchorY?: number) => import("./model").Point;
    readonly toBbox: (code: string) => import("./model").Bbox;
    readonly jisCodeToPoint: (code: string, anchorX?: number, anchorY?: number) => import("./model").Point;
    readonly jisCodeToBbox: (code: string) => import("./model").Bbox;
    readonly toLevel: (code: string) => import("./model").Level;
};
export default wgs;
//# sourceMappingURL=index.d.ts.map