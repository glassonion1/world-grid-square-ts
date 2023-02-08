const calcZ = (lng) => {
    return -100 < lng && lng <= 100 ? 0 : 1;
};
const level1 = (lng, lat) => {
    if (lng <= -180 || 180 < lng) {
        throw new RangeError(`Longitude is out of bound: ${lng}`);
    }
    if (lat < -90 || 90 < lat) {
        throw new RangeError(`Latitude is out of bound: ${lat}`);
    }
    const x = lng > 0 ? 0 : 1;
    const y = lat > 0 ? 0 : 1;
    const z = calcZ(lng);
    const o = 2 * x + 4 * y + z + 1;
    const p = (Math.abs(lat) * 60) / 40;
    const padP = String(Math.floor(p)).padStart(3, '0');
    const u = Math.abs(lng) - 100 * z;
    const padU = String(Math.floor(u)).padStart(2, '0');
    const code = `${o}${padP}${padU}`;
    return { west: u, south: p, code: code };
};
export const level2 = (lng, lat) => {
    const lv1 = level1(lng, lat);
    const a = ((Math.abs(lat) * 60) / 40 - lv1.south) * 40;
    const q = a / 5;
    const f = Math.abs(lng) - 100 * calcZ(lng) - lv1.west;
    const v = (f * 60) / 7.5;
    const code = `${lv1.code}${Math.floor(q)}${Math.floor(v)}`;
    return { west: v, south: q, code: code };
};
export const first = (lng, lat) => {
    return level1(lng, lat).code;
};
export const second = (lng, lat) => {
    return level2(lng, lat).code;
};
/*
export const third = (lng: number, lat: number): val => {
  const lv2 = second(lng, lat)

  
  
  return s.slice(0, 6)
}*/
