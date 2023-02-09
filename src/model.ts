export const unitLat = 40 / 60
export const unitLng = 1

export interface Grid {
  west: number
  south: number
  width: number
  height: number
  code: string
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
