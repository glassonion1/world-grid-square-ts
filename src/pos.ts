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

const toLv1Pos = (code: string): Grid => {
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

const toLv2Pos = (code: string): Grid => {
  const lv1 = toLv1Pos(code)
  return toGrid(lv1, 2, 8)
}

const toLv3Pos = (code: string): Grid => {
  const lv2 = toLv2Pos(code)
  return toGrid(lv2, 3, 10)
}

const toLv4Pos = (code: string): Grid => {
  const lv3 = toLv3Pos(code)
  return toGrid(lv3, 4, 2)
}

const toLv5Pos = (code: string): Grid => {
  const lv4 = toLv4Pos(code)
  return toGrid(lv4, 5, 2)
}

const toLv6Pos = (code: string): Grid => {
  const lv5 = toLv5Pos(code)
  return toGrid(lv5, 6, 2)
}

/**
 * Returns longitude and latitude from the grid square code.
 *
 * @param code - the grid square code
 * @param anchorX - anchor point of longitude
   @param anchorY - anchor point of latitude
 * @returns Point object
 */
export const toPoint = (
  code: string,
  anchorX: number = 0.0,
  anchorY: number = 0.0
): Point => {
  code = code.replaceAll('-', '')
  const funcs: { [key: number]: (code: string) => Grid } = {
    1: toLv1Pos,
    2: toLv2Pos,
    3: toLv3Pos,
    4: toLv4Pos,
    5: toLv5Pos,
    6: toLv6Pos
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
