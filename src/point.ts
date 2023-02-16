import {
  Grid,
  Point,
  Bbox,
  Unit,
  toLength,
  toLevel,
  parseFirstDigit
} from './model'

const toGrid = (grid: Grid, level: number, divide: number): Grid => {
  const len = toLength(level)
  const code = grid.code

  let y = Number(code[len - 2])
  let x = Number(code[len - 1])
  if (divide == 2) {
    const c = Number(code[len - 1]) - 1
    y = Math.trunc(c / 2)
    x = c % 2
  }

  const h = grid.height / divide
  const w = grid.width / divide

  const [signX, signY] = parseFirstDigit(code)

  const originLat = grid.originLat + y * h * signY
  const originLng = grid.originLng + x * w * signX

  return {
    originLng: originLng,
    originLat: originLat,
    width: w,
    height: h,
    code: code
  }
}

const toLv1 = (code: string): Grid => {
  const [signX, signY, z] = parseFirstDigit(code)

  const y = Number(code.substring(1, 4))
  const x = Number(code.substring(4, 6))

  const originLat = y * Unit.lat * signY
  const originLng = (x * Unit.lng + 100 * z) * signX

  return {
    originLng: originLng,
    originLat: originLat,
    width: Unit.lng,
    height: Unit.lat,
    code: code
  }
}

const toLv2 = (code: string): Grid => {
  const lv1 = toLv1(code)
  return toGrid(lv1, 2, 8)
}

const toLv3 = (code: string): Grid => {
  const lv2 = toLv2(code)
  return toGrid(lv2, 3, 10)
}

const toLv4 = (code: string): Grid => {
  const lv3 = toLv3(code)
  return toGrid(lv3, 4, 2)
}

const toLv5 = (code: string): Grid => {
  const lv4 = toLv4(code)
  return toGrid(lv4, 5, 2)
}

const toLv6 = (code: string): Grid => {
  const lv5 = toLv5(code)
  return toGrid(lv5, 6, 2)
}

const toExt25 = (code: string): Grid => {
  const lv6 = toLv6(code)
  return toGrid(lv6, 7, 5)
}

const toExt12 = (code: string): Grid => {
  const ext25 = toExt25(code)
  return toGrid(ext25, 8, 2)
}

const toExt5 = (code: string): Grid => {
  const ext25 = toExt25(code)
  return toGrid(ext25, 9, 5)
}

/**
 * Returns longitude and latitude from the grid square code.
 *
 * @param code - the grid square code
 * @param anchorX - anchor point of longitude
 * @param anchorY - anchor point of latitude
 * @returns Point object
 */
export const toPoint = (
  code: string,
  anchorX: number = 0.0,
  anchorY: number = 0.0
): Point => {
  code = code.replaceAll('-', '')
  const funcs: { [key: number]: (code: string) => Grid } = {
    1: toLv1,
    2: toLv2,
    3: toLv3,
    4: toLv4,
    5: toLv5,
    6: toLv6,
    7: toExt25,
    8: toExt12,
    9: toExt5
  }

  const level = toLevel(code)

  const func = funcs[level]

  const g = func(code)

  const digit = 14
  const originLng =
    Math.trunc(g.originLng * Math.pow(10, digit)) / Math.pow(10, digit)
  const originLat =
    Math.trunc(g.originLat * Math.pow(10, digit)) / Math.pow(10, digit)

  const [signX, signY] = parseFirstDigit(code)

  if (signX < 0) {
    anchorX -= 1
  }

  if (signY < 0) {
    anchorY -= 1
  }

  const lng = originLng + anchorX * g.width
  const lat = originLat + anchorY * g.height

  return { lng: lng, lat: lat }
}

/**
 * Returns longitude and latitude from the jis grid square code.
 *
 * @param code - the jis grid square code
 * @param anchorX - anchor point of longitude
   @param anchorY - anchor point of latitude
 * @returns Point object
 */
export const jisCodeToPoint = (
  code: string,
  anchorX: number = 0.0,
  anchorY: number = 0.0
): Point => {
  return toPoint(`20${code}`, anchorX, anchorY)
}

/**
 * Returns bounding box from the grid square code.
 *
 * @param code - the grid square code
 * @returns Bbox object
 */
export const toBbox = (code: string): Bbox => {
  const ws = toPoint(code, 0, 0)
  const en = toPoint(code, 1, 1)

  return {
    west: ws.lng,
    south: ws.lat,
    east: en.lng,
    north: en.lat
  }
}

/**
 * Returns bounding box from the jis grid square code.
 *
 * @param code - the jis grid square code
 * @returns Bbox object
 */
export const jisCodeToBbox = (code: string): Bbox => {
  return toBbox(`20${code}`)
}
