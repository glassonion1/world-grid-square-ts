import { toBbox, toCode } from '../src'

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
        const qk = toCode(lng, lat, v)
        expect(qk.startsWith(key)).toBeTruthy()
        key = qk
      }
    })

    it(`tests boundary value lng:${lng}, lat:${lat}`, () => {
      const level = 9
      const qk = toCode(lng, lat, level)
      const bbox = toBbox(qk)

      const epsilon = 0.00000000001

      const qk1 = toCode(bbox.west + epsilon, bbox.south + epsilon, level)
      const qk2 = toCode(bbox.east - epsilon, bbox.north - epsilon, level)
      expect(qk === qk1).toBeTruthy()
      expect(qk1 === qk2).toBeTruthy()
    })
  }
})
