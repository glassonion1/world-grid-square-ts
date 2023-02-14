export { toCode } from './code'
export { toLevel } from './model'
export { toPoint, toBbox } from './point'

import { toCode, toJisCode } from './code'
import { toLevel } from './model'
import { toPoint, toBbox, jisCodeToPoint, jisCodeToBbox } from './point'

const wgs = {
  toCode: toCode,
  toJisCode: toJisCode,
  toPoint: toPoint,
  toBbox: toBbox,
  jisCodeToPoint: jisCodeToPoint,
  jisCodeToBbox: jisCodeToBbox,
  toLevel: toLevel
} as const

export default wgs
