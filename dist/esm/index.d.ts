export { pointToCode } from './point';
export { codeToPoint, codeToBbox, codeToLevel } from './code';
export { jisCodeToBbox, jisCodeToPoint, pointToJisCode } from './jis_code';
declare const wgs: {
    readonly pointToCode: (lng: number, lat: number, level: number) => string;
    readonly pointToJisCode: (lng: number, lat: number, level: number) => string;
    readonly codeToPoint: (code: string, anchorX?: number, anchorY?: number) => import("./model").Point;
    readonly codeToBbox: (code: string) => import("./model").Bbox;
    readonly jisCodeToPoint: (code: string, anchorX?: number, anchorY?: number) => import("./model").Point;
    readonly jisCodeToBbox: (code: string) => import("./model").Bbox;
    readonly codeToLevel: (code: string) => number;
};
export default wgs;
//# sourceMappingURL=index.d.ts.map