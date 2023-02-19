import { codeToBbox, pointToCode } from '../src'

describe('run tests for random point', () => {
  const random = (min: number, max: number): number => {
    return Math.random() * (max - min) + min
  }
  for (let i = 0; i < 100; i++) {
    const lng = random(-180, 180)
    const lat = random(-85, 85)

    it(`tests key parentage lng:${lng}, lat:${lat}`, () => {
      // Check if the content of the higher key is included
      let key = ''
      const range = [...Array(9)].keys()
      for (var v of range) {
        if (v == 0) continue
        const qk = pointToCode(lng, lat, v)
        expect(qk.startsWith(key)).toBeTruthy()
        key = qk
      }
    })

    it(`tests boundary value lng:${lng}, lat:${lat}`, () => {
      const level = 9
      const code = pointToCode(lng, lat, level)
      const bbox = codeToBbox(code)

      const epsilon = 0.00000000001

      const code1 = pointToCode(
        bbox.west + epsilon,
        bbox.south + epsilon,
        level
      )
      const code2 = pointToCode(
        bbox.east - epsilon,
        bbox.north - epsilon,
        level
      )
      expect(code === code1).toBeTruthy()
      expect(code1 === code2).toBeTruthy()
    })
  }
})
