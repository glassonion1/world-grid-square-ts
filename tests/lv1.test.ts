import { toCode } from '../src'

describe('run tests', () => {
  it('test range -180 < lng <= 180, -90 <= lat <= 90', () => {
    expect(() => {
      toCode(-180, 0, 1)
    }).toThrowError(RangeError)
    expect(() => {
      toCode(180.01, 0, 1)
    }).toThrowError(RangeError)
    expect(() => {
      toCode(0, -90.001, 1)
    }).toThrowError(RangeError)
    expect(() => {
      toCode(0, 90.001, 1)
    }).toThrowError(RangeError)
  })
})

describe('run tests for northern hemisphere', () => {
  it('0 < lng <= 100 and 0 < lat <= 90', () => {
    expect(toCode(10, 10, 1)[0]).toBe('1')
    expect(toCode(0.1, 0.1, 1)[0]).toBe('1')
    expect(toCode(0.1, 90, 1)[0]).toBe('1')
    expect(toCode(100, 0.001, 1)[0]).toBe('1')
    expect(toCode(100, 90, 1)[0]).toBe('1')

    expect(toCode(100.1, 1, 1)[0]).not.toBe('1')
    expect(toCode(100, 0, 1)[0]).not.toBe('1')
  })

  it('100 < lng <= 180 and 0 < lat <= 90', () => {
    expect(toCode(135, 35, 1)[0]).toBe('2')
    expect(toCode(100.1, 0.1, 1)[0]).toBe('2')
    expect(toCode(100.001, 90, 1)[0]).toBe('2')
    expect(toCode(180, 0.001, 1)[0]).toBe('2')
    expect(toCode(180, 90, 1)[0]).toBe('2')

    expect(toCode(100.1, 0, 1)[0]).not.toBe('2')
  })

  it('-100 < lng <= 0 and 0 < lat <= 90', () => {
    expect(toCode(-10, 10, 1)[0]).toBe('3')
    expect(toCode(0, 0.1, 1)[0]).toBe('3')
    expect(toCode(0, 90, 1)[0]).toBe('3')
    expect(toCode(-99.9999, 0.001, 1)[0]).toBe('3')
    expect(toCode(-99.9999, 90, 1)[0]).toBe('3')

    expect(toCode(-100, 1, 1)[0]).not.toBe('3')
    expect(toCode(-99, 0, 1)[0]).not.toBe('3')
  })

  it('-180 < lng <= -100 and 0 < lat <= 90', () => {
    expect(toCode(-135, 35, 1)[0]).toBe('4')
    expect(toCode(-100, 0.1, 1)[0]).toBe('4')
    expect(toCode(-100, 90, 1)[0]).toBe('4')
    expect(toCode(-179.999, 0.001, 1)[0]).toBe('4')
    expect(toCode(-179.999, 90, 1)[0]).toBe('4')

    expect(toCode(-100, 0, 1)[0]).not.toBe('4')
  })
})

describe('run tests for south hemisphere', () => {
  it('0 < lng <= 100 and -90 <= lat <= 0', () => {
    expect(toCode(10, -10, 1)[0]).toBe('5')
    expect(toCode(0.1, 0, 1)[0]).toBe('5')
    expect(toCode(0.1, -90, 1)[0]).toBe('5')
    expect(toCode(100, 0, 1)[0]).toBe('5')
    expect(toCode(100, -90, 1)[0]).toBe('5')

    expect(toCode(100.1, 0, 1)[0]).not.toBe('5')
    expect(toCode(100, 0.1, 1)[0]).not.toBe('5')
  })

  it('100 < lng <= 180 and -90 <= lat <= 0', () => {
    expect(toCode(135, -35, 1)[0]).toBe('6')
    expect(toCode(100.1, 0, 1)[0]).toBe('6')
    expect(toCode(100.001, -90, 1)[0]).toBe('6')
    expect(toCode(180, 0, 1)[0]).toBe('6')
    expect(toCode(180, -90, 1)[0]).toBe('6')

    expect(toCode(100.1, 0.1, 1)[0]).not.toBe('6')
  })

  it('-100 < lng <= 0 and -90 <= lat <= 0', () => {
    expect(toCode(-10, -10, 1)[0]).toBe('7')
    expect(toCode(0, 0, 1)[0]).toBe('7')
    expect(toCode(0, -90, 1)[0]).toBe('7')
    expect(toCode(-99.9999, 0, 1)[0]).toBe('7')
    expect(toCode(-99.9999, -90, 1)[0]).toBe('7')

    expect(toCode(-100, 0.1, 1)[0]).not.toBe('7')
    expect(toCode(-99, 0.1, 1)[0]).not.toBe('7')
  })

  it('-180 < lng <= -100 and -90 <= lat <= 0', () => {
    expect(toCode(-135, -35, 1)[0]).toBe('8')
    expect(toCode(-100, 0, 1)[0]).toBe('8')
    expect(toCode(-100, -90, 1)[0]).toBe('8')
    expect(toCode(-179.999, 0, 1)[0]).toBe('8')
    expect(toCode(-179.999, -90, 1)[0]).toBe('8')

    expect(toCode(-100, 0.1, 1)[0]).not.toBe('8')
  })
})
