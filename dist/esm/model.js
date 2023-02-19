/**
 * size of one grid
 */
export const Unit = {
    lng: 1,
    lat: 40 / 60
};
export const toLength = (level) => {
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
