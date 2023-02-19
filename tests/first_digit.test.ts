import { toFirstDigit } from '../src/point'

describe('run tests', () => {
  it('test range -180 < lng <= 180, -90 <= lat <= 90', () => {
    expect(() => {
      toFirstDigit(-180, 0)
    }).toThrowError(RangeError)
    expect(() => {
      toFirstDigit(180.01, 0)
    }).toThrowError(RangeError)
    expect(() => {
      toFirstDigit(0, -90.001)
    }).toThrowError(RangeError)
    expect(() => {
      toFirstDigit(0, 90.001)
    }).toThrowError(RangeError)
  })
})

describe('run tests for northern hemisphere', () => {
  it('0 < lng <= 100 and 0 < lat <= 90', () => {
    expect(toFirstDigit(10, 10)).toBe(1)
    expect(toFirstDigit(0.1, 0.1)).toBe(1)
    expect(toFirstDigit(0.1, 90)).toBe(1)
    expect(toFirstDigit(100, 0.001)).toBe(1)
    expect(toFirstDigit(100, 90)).toBe(1)

    expect(toFirstDigit(100.1, 1)).not.toBe(1)
    expect(toFirstDigit(100, 0)).not.toBe(1)
  })

  it('100 < lng <= 180 and 0 < lat <= 90', () => {
    expect(toFirstDigit(135, 35)).toBe(2)
    expect(toFirstDigit(100.1, 0.1)).toBe(2)
    expect(toFirstDigit(100.001, 90)).toBe(2)
    expect(toFirstDigit(180, 0.001)).toBe(2)
    expect(toFirstDigit(180, 90)).toBe(2)

    expect(toFirstDigit(100.1, 0)).not.toBe(2)
  })

  it('-100 < lng <= 0 and 0 < lat <= 90', () => {
    expect(toFirstDigit(-10, 10)).toBe(3)
    expect(toFirstDigit(0, 0.1)).toBe(3)
    expect(toFirstDigit(0, 90)).toBe(3)
    expect(toFirstDigit(-99.9999, 0.001)).toBe(3)
    expect(toFirstDigit(-99.9999, 90)).toBe(3)

    expect(toFirstDigit(-100, 1)).not.toBe(3)
    expect(toFirstDigit(-99, 0)).not.toBe(3)
  })

  it('-180 < lng <= -100 and 0 < lat <= 90', () => {
    expect(toFirstDigit(-135, 35)).toBe(4)
    expect(toFirstDigit(-100, 0.1)).toBe(4)
    expect(toFirstDigit(-100, 90)).toBe(4)
    expect(toFirstDigit(-179.999, 0.001)).toBe(4)
    expect(toFirstDigit(-179.999, 90)).toBe(4)

    expect(toFirstDigit(-100, 0)).not.toBe(4)
  })
})

describe('run tests for south hemisphere', () => {
  it('0 < lng <= 100 and -90 <= lat <= 0', () => {
    expect(toFirstDigit(10, -10)).toBe(5)
    expect(toFirstDigit(0.1, 0)).toBe(5)
    expect(toFirstDigit(0.1, -90)).toBe(5)
    expect(toFirstDigit(100, 0)).toBe(5)
    expect(toFirstDigit(100, -90)).toBe(5)

    expect(toFirstDigit(100.1, 0)).not.toBe(5)
    expect(toFirstDigit(100, 0.1)).not.toBe(5)
  })

  it('100 < lng <= 180 and -90 <= lat <= 0', () => {
    expect(toFirstDigit(135, -35)).toBe(6)
    expect(toFirstDigit(100.1, 0)).toBe(6)
    expect(toFirstDigit(100.001, -90)).toBe(6)
    expect(toFirstDigit(180, 0)).toBe(6)
    expect(toFirstDigit(180, -90)).toBe(6)

    expect(toFirstDigit(100.1, 0.1)).not.toBe(6)
  })

  it('-100 < lng <= 0 and -90 <= lat <= 0', () => {
    expect(toFirstDigit(-10, -10)).toBe(7)
    expect(toFirstDigit(0, 0)).toBe(7)
    expect(toFirstDigit(0, -90)).toBe(7)
    expect(toFirstDigit(-99.9999, 0)).toBe(7)
    expect(toFirstDigit(-99.9999, -90)).toBe(7)

    expect(toFirstDigit(-100, 0.1)).not.toBe(7)
    expect(toFirstDigit(-99, 0.1)).not.toBe(7)
  })

  it('-180 < lng <= -100 and -90 <= lat <= 0', () => {
    expect(toFirstDigit(-135, -35)).toBe(8)
    expect(toFirstDigit(-100, 0)).toBe(8)
    expect(toFirstDigit(-100, -90)).toBe(8)
    expect(toFirstDigit(-179.999, 0)).toBe(8)
    expect(toFirstDigit(-179.999, -90)).toBe(8)

    expect(toFirstDigit(-100, 0.1)).not.toBe(8)
  })
})
