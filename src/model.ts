export const Unit = {
  lng: 1,
  lat: 40 / 60
} as const

export interface Grid {
  // FIXME: west south is wrong name. basis lng lat
  west: number
  south: number
  width: number
  height: number
  code: string
}

export interface Bbox {
  west: number
  south: number
  east: number
  north: number
}

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
  }
  throw new Error(`Unsupported code: ${code}`)
}
