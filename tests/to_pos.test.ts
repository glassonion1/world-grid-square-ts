import wgs from '../src'

const cases = [
  {
    label: 'Lv1 Tokyo Tower',
    code: '205339',
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
    code: '20533935',
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
    code: '2053393599',
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
    code: '20533935992',
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
    code: '205339359921',
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
    code: '2053393599212',
    ws: {
      lng: 139.7453125,
      lat: 35.65833333333333
    },
    center: {
      lng: 139.74609375,
      lat: 35.658854166666664
    }
  },
  {
    label: 'Lv1 Kyoto Tower',
    code: '205235',
    ws: {
      lng: 135,
      lat: 34.66666666666666
    },
    center: {
      lng: 135.5,
      lat: 34.99999999999999
    }
  },
  {
    label: 'Lv2 Kyoto Tower',
    code: '20523536',
    ws: {
      lng: 135.75,
      lat: 34.91666666666666
    },
    center: {
      lng: 135.8125,
      lat: 34.95833333333332
    }
  },
  {
    label: 'Lv3 Kyoto Tower',
    code: '2052353680',
    ws: {
      lng: 135.75,
      lat: 34.98333333333333
    },
    center: {
      lng: 135.75625,
      lat: 34.9875
    }
  },
  {
    label: 'Lv4 Kyoto Tower',
    code: '20523536804',
    ws: {
      lng: 135.75625,
      lat: 34.9875
    },
    center: {
      lng: 135.759375,
      lat: 34.98958333333333
    }
  },
  {
    label: 'Lv5 Kyoto Tower',
    code: '205235368041',
    ws: {
      lng: 135.75625,
      lat: 34.9875
    },
    center: {
      lng: 135.7578125,
      lat: 34.98854166666666
    }
  },
  {
    label: 'Lv6 Kyoto Tower',
    code: '2052353680412',
    ws: {
      lng: 135.7578125,
      lat: 34.9875
    },
    center: {
      lng: 135.75859375,
      lat: 34.98802083333333
    }
  }
]

describe('run tests', () => {
  cases.forEach((c) => {
    it(c.label, () => {
      expect(wgs.toPoint(c.code)).toStrictEqual(c.ws)
      expect(wgs.toPoint(c.code, 0.5, 0.5)).toStrictEqual(c.center)
    })
  })

  it('test toBbox', () => {
    const bbox = {
      west: 77.20625,
      south: 28.61458333333333,
      east: 77.2078125,
      north: 28.615624999999994
    }
    expect(wgs.toBbox('1042777136431')).toStrictEqual(bbox)
  })

  it('test toBbox', () => {
    const bbox = {
      west: 135.7578125,
      south: 34.9875,
      east: 135.759375,
      north: 34.98854166666666
    }
    expect(wgs.toBbox('2052353680412')).toStrictEqual(bbox)
  })

  it('test toBbox', () => {
    const bbox = {
      west: -1,
      south: 51.33333333333333,
      east: 0,
      north: 51.99999999999999
    }
    expect(wgs.toBbox('307700')).toStrictEqual(bbox)
  })

  it('test toBbox', () => {
    const bbox = {
      west: -0.125,
      south: 51.41666666666666,
      east: 0,
      north: 51.49999999999999
    }
    expect(wgs.toBbox('30770010')).toStrictEqual(bbox)
  })

  it('test toBbox', () => {
    const bbox = {
      west: -0.11249999999999999,
      south: 51.49479166666666,
      east: -0.1109375,
      north: 51.49583333333332
    }
    expect(wgs.toBbox('3077001098244')).toStrictEqual(bbox)
  })
})
