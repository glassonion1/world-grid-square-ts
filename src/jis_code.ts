import { codeToBbox, codeToPoint } from './code'
import { Bbox, Point } from './model'
import { pointToCode } from './point'

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
  return codeToPoint(`20${code}`, anchorX, anchorY)
}

/**
 * Returns bounding box from the jis grid square code.
 *
 * @param code - the jis grid square code
 * @returns Bbox object
 */
export const jisCodeToBbox = (code: string): Bbox => {
  return codeToBbox(`20${code}`)
}

/**
 * Returns the jis grid square code from longitude and latitude.
 *
 * @param lng - longitude
 * @param lat - latitude
 * @returns the jis grid square code
 */
export const pointToJisCode = (
  lng: number,
  lat: number,
  level: number
): string => {
  if (lng < 100 || 180 <= lng) {
    throw new RangeError(`Longitude is out of bound: ${lng}`)
  }

  if (lat < 0 || 66.66 <= lat) {
    throw new RangeError(`Latitude is out of bound: ${lat}`)
  }

  return pointToCode(lng, lat, level).slice(2)
}
