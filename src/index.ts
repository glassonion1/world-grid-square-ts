export { toCode } from './code'
export { toLevel } from './model'
export { toPoint, toBbox } from './pos'

import { toCode } from './code'
import { toLevel } from './model'
import { toPoint, toBbox } from './pos'

const wgs = {
  toCode: toCode,
  toPoint: toPoint,
  toBbox: toBbox,
  toLevel: toLevel
} as const

export default wgs
