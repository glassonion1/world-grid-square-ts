import { toPosition } from '../src'

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
      expect(toPosition(c.code)).toStrictEqual(c.ws)
      expect(toPosition(c.code, 0.5)).toStrictEqual(c.center)
    })
  })
})
