export type { Grid, Point, Bbox, Unit } from './types'
export { pointToCode } from './point'
export { codeToPoint, codeToBbox, codeToLevel } from './code'
export { jisCodeToBbox, jisCodeToPoint, pointToJisCode } from './jis_code'

import { pointToCode } from './point'
import { codeToPoint, codeToBbox, codeToLevel } from './code'
import { jisCodeToBbox, jisCodeToPoint, pointToJisCode } from './jis_code'

export const wgs = {
  pointToCode: pointToCode,
  pointToJisCode: pointToJisCode,
  codeToPoint: codeToPoint,
  codeToBbox: codeToBbox,
  jisCodeToPoint: jisCodeToPoint,
  jisCodeToBbox: jisCodeToBbox,
  codeToLevel: codeToLevel
} as const
