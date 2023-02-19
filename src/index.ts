export { pointToCode } from './point'
export { codeToPoint, codeToBbox, codeToLevel } from './code'
export { jisCodeToBbox, jisCodeToPoint, pointToJisCode } from './jis_code'

import { pointToCode } from './point'
import { codeToPoint, codeToBbox, codeToLevel } from './code'
import { jisCodeToBbox, jisCodeToPoint, pointToJisCode } from './jis_code'

const wgs = {
  pointToCode: pointToCode,
  pointToJisCode: pointToJisCode,
  codeToPoint: codeToPoint,
  codeToBbox: codeToBbox,
  jisCodeToPoint: jisCodeToPoint,
  jisCodeToBbox: jisCodeToBbox,
  codeToLevel: codeToLevel
} as const

export default wgs
