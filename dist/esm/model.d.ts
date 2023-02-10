export declare const Unit: {
    readonly lng: 1;
    readonly lat: number;
};
export interface Grid {
    west: number;
    south: number;
    width: number;
    height: number;
    code: string;
}
export interface Bbox {
    west: number;
    south: number;
    east: number;
    north: number;
}
export interface Point {
    lng: number;
    lat: number;
}
export declare const toXyz: (code: string) => number[];
export declare const toLength: (level: number) => number;
export declare const toLevel: (code: string) => number;
//# sourceMappingURL=model.d.ts.map