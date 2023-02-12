import wgs from '../src'

const cases = [
  {
    label: 'Lv1 Tokyo Tower',
    code: '5339',
    ws: {
      lng: 139,
      lat: 35.33333333333333
    },
    center: {
      lng: 139.5,
      lat: 35.666666666666664
    }
  },
  {
    label: 'Lv2 Tokyo Tower',
    code: '533935',
    ws: {
      lng: 139.625,
      lat: 35.58333333333333
    },
    center: {
      lng: 139.6875,
      lat: 35.62499999999999
    }
  },
  {
    label: 'Lv3 Tokyo Tower',
    code: '53393599',
    ws: {
      lng: 139.7375,
      lat: 35.65833333333333
    },
    center: {
      lng: 139.74375,
      lat: 35.6625
    }
  },
  {
    label: 'Lv4 Tokyo Tower',
    code: '533935992',
    ws: {
      lng: 139.74375,
      lat: 35.65833333333333
    },
    center: {
      lng: 139.74687500000002,
      lat: 35.66041666666666
    }
  },
  {
    label: 'Lv5 Tokyo Tower',
    code: '5339359921',
    ws: {
      lng: 139.74375,
      lat: 35.65833333333333
    },
    center: {
      lng: 139.7453125,
      lat: 35.659375
    }
  },
  {
    label: 'Lv6 Tokyo Tower',
    code: '53393599212',
    ws: {
      lng: 139.7453125,
      lat: 35.65833333333333
    },
    center: {
      lng: 139.74609375,
      lat: 35.658854166666664
    }
  }
]

describe('run tests', () => {
  const tokyoTower = [139.745433, 35.658581]
  const kyotoTower = [135.759363, 34.987574]
  const shibuya = [139.6982122, 35.6640352]
  it('test jis code', () => {
    expect(wgs.toJisCode(shibuya[0], shibuya[1], 1)).toBe('5339')
    expect(wgs.toJisCode(shibuya[0], shibuya[1], 2)).toBe('533935')
    expect(wgs.toJisCode(shibuya[0], shibuya[1], 3)).toBe('53393595')
    expect(wgs.toJisCode(shibuya[0], shibuya[1], 4)).toBe('533935954')
    expect(wgs.toJisCode(shibuya[0], shibuya[1], 5)).toBe('5339359542')
    expect(wgs.toJisCode(shibuya[0], shibuya[1], 6)).toBe('53393595423')

    expect(wgs.toJisCode(kyotoTower[0], kyotoTower[1], 1)).toBe('5235')
    expect(wgs.toJisCode(kyotoTower[0], kyotoTower[1], 2)).toBe('523536')
    expect(wgs.toJisCode(kyotoTower[0], kyotoTower[1], 3)).toBe('52353680')
    expect(wgs.toJisCode(kyotoTower[0], kyotoTower[1], 4)).toBe('523536804')
    expect(wgs.toJisCode(kyotoTower[0], kyotoTower[1], 5)).toBe('5235368041')
    expect(wgs.toJisCode(kyotoTower[0], kyotoTower[1], 6)).toBe('52353680412')

    expect(wgs.toJisCode(tokyoTower[0], tokyoTower[1], 1)).toBe('5339')
    expect(wgs.toJisCode(tokyoTower[0], tokyoTower[1], 2)).toBe('533935')
    expect(wgs.toJisCode(tokyoTower[0], tokyoTower[1], 3)).toBe('53393599')
    expect(wgs.toJisCode(tokyoTower[0], tokyoTower[1], 4)).toBe('533935992')
    expect(wgs.toJisCode(tokyoTower[0], tokyoTower[1], 5)).toBe('5339359921')
    expect(wgs.toJisCode(tokyoTower[0], tokyoTower[1], 6)).toBe('53393599212')
  })

  it('test jis code exception', () => {
    expect(() => {
      wgs.toJisCode(-0.1, kyotoTower[1], 1)
    }).toThrowError(RangeError)
    expect(() => {
      wgs.toJisCode(66.66, kyotoTower[1], 1)
    }).toThrowError(RangeError)
    expect(() => {
      wgs.toJisCode(kyotoTower[0], 99.99, 1)
    }).toThrowError(RangeError)
    expect(() => {
      wgs.toJisCode(kyotoTower[0], 180, 1)
    }).toThrowError(RangeError)
    expect(() => {
      wgs.toJisCode(kyotoTower[0], kyotoTower[1], 0)
    }).toThrowError(Error)
    expect(() => {
      wgs.toJisCode(kyotoTower[0], kyotoTower[1], 7)
    }).toThrowError(Error)
  })

  cases.forEach((c) => {
    it(c.label, () => {
      expect(wgs.jisCodeToPoint(c.code)).toStrictEqual(c.ws)
      expect(wgs.jisCodeToPoint(c.code, 0.5, 0.5)).toStrictEqual(c.center)
      expect(c.ws.lng < c.center.lng).toBeTruthy()
      expect(c.ws.lat < c.center.lat).toBeTruthy()
    })
  })

  it('test jisCodeToBbox', () => {
    const bbox = {
      west: 135.7578125,
      south: 34.9875,
      east: 135.759375,
      north: 34.98854166666666
    }
    expect(wgs.jisCodeToBbox('52353680412')).toStrictEqual(bbox)
  })
})
