/**
 * size of one grid
 */
export const Unit = {
  lng: 1,
  lat: 40 / 60
} as const

/**
 * Grid
 *
 * @remarks
 * For east longitude and north latitude, the origin is west south.
 * For west longitude and north latitude, the origin is east south.
 * For east longitude and south latitude, the origin is west north.
 * For west longitude and south latitude, the origin is east north.
 */
export interface Grid {
  /** longitude to be used as the basis for calculation */
  originLng: number
  /** latitude to be used as the basis for calculation */
  originLat: number
  /** width of a grid */
  width: number
  /** height of a grid */
  height: number
  /** encoded code */
  code: string
}

/**
 * Bounding Box
 */
export interface Bbox {
  west: number
  south: number
  east: number
  north: number
}

/**
 * Point
 */
export interface Point {
  lng: number
  lat: number
}

export const parseFirstDigit = (code: string): number[] => {
  const o = Number(code[0])
  const z = (o - 1) % 2
  const x = ((o - z - 1) / 2) % 2
  const y = (o - 2 * x - z - 1) / 4

  const signX = 1 - 2 * x
  const signY = 1 - 2 * y

  return [signX, signY, z]
}

export const toLength = (level: number): number => {
  switch (level) {
    case 1:
      return 6
    case 2:
      return 8
    case 3:
      return 10
    case 4:
      return 11
    case 5:
      return 12
    case 6:
      return 13
    case 7:
      return 15
    case 8:
      return 16
    case 9:
      return 17
  }
  throw new Error(`Unsupported level: ${level}`)
}

export const toLevel = (code: string): number => {
  switch (code.length) {
    case 6:
      return 1
    case 8:
      return 2
    case 10:
      return 3
    case 11:
      return 4
    case 12:
      return 5
    case 13:
      return 6
    case 15:
      return 7
    case 16:
      return 8
    case 17:
      return 9
  }
  throw new Error(`Unsupported code: ${code}`)
}
