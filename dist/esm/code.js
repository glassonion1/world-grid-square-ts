import { Unit } from './model';
const divideGrid = (lng, lat, parent, divide) => {
    const h = parent.height / divide;
    const w = parent.width / divide;
    const y = Math.floor((lat - parent.south) / h);
    const x = Math.floor((lng - parent.west) / w);
    let end = `${y}${x}`;
    if (parent.code.length >= 10) {
        // south-west=1, south-east=2, north-west=3, north-east=4
        end = `${2 * y + x + 1}`;
    }
    const code = `${parent.code}${end}`;
    const south = parent.south + y * h;
    const west = parent.west + x * w;
    return { west: west, south: south, width: w, height: h, code: code };
};
const toLv1 = (lng, lat) => {
    if (lng <= -180 || 180 < lng) {
        throw new RangeError(`Longitude is out of bound: ${lng}`);
    }
    if (lat < -90 || 90 < lat) {
        throw new RangeError(`Latitude is out of bound: ${lat}`);
    }
    const x = lng > 0 ? 0 : 1;
    const y = lat > 0 ? 0 : 1;
    const z = -100 < lng && lng <= 100 ? 0 : 1;
    const o = 2 * x + 4 * y + z + 1;
    const w = Unit.lng;
    const h = Unit.lat;
    const p = Math.floor(Math.abs(lat) / h);
    const padP = String(p).padStart(3, '0');
    const u = Math.floor(Math.abs(lng) - 100 * z);
    const padU = String(Math.floor(u)).padStart(2, '0');
    const code = `${o}${padP}${padU}`;
    const south = Math.floor(lat / h) * h;
    const west = Math.floor(lng);
    return { west: west, south: south, width: w, height: h, code: code };
};
const toLv2 = (lng, lat) => {
    const lv1 = toLv1(lng, lat);
    return divideGrid(lng, lat, lv1, 8);
};
const toLv3 = (lng, lat) => {
    const lv2 = toLv2(lng, lat);
    return divideGrid(lng, lat, lv2, 10);
};
const toLv4 = (lng, lat) => {
    const lv3 = toLv3(lng, lat);
    return divideGrid(lng, lat, lv3, 2);
};
const toLv5 = (lng, lat) => {
    const lv4 = toLv4(lng, lat);
    return divideGrid(lng, lat, lv4, 2);
};
const toLv6 = (lng, lat) => {
    const lv5 = toLv5(lng, lat);
    return divideGrid(lng, lat, lv5, 2);
};
export const toCode = (lng, lat, level) => {
    const funcs = {
        1: toLv1,
        2: toLv2,
        3: toLv3,
        4: toLv4,
        5: toLv5,
        6: toLv6
    };
    const func = funcs[level];
    return func(lng, lat).code;
};
