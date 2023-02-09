import wgs from '../src'

const tokyoTower = [139.745433, 35.658581]
const kyotoTower = [135.759363, 34.987574]
const shibuya = [139.6982122, 35.6640352]

const cases = [
  {
    label: 'Lv1 Tokyo Tower',
    lng: tokyoTower[0],
    lat: tokyoTower[1],
    level: 1,
    want: '205339'
  },
  {
    label: 'Lv2 Tokyo Tower',
    lng: tokyoTower[0],
    lat: tokyoTower[1],
    level: 2,
    want: '20533935'
  },
  {
    label: 'Lv3 Tokyo Tower',
    lng: tokyoTower[0],
    lat: tokyoTower[1],
    level: 3,
    want: '2053393599'
  },
  {
    label: 'Lv4 Tokyo Tower',
    lng: tokyoTower[0],
    lat: tokyoTower[1],
    level: 4,
    want: '20533935992'
  },
  {
    label: 'Lv5 Tokyo Tower',
    lng: tokyoTower[0],
    lat: tokyoTower[1],
    level: 5,
    want: '205339359921'
  },
  {
    label: 'Lv6 Tokyo Tower',
    lng: tokyoTower[0],
    lat: tokyoTower[1],
    level: 6,
    want: '2053393599212'
  },
  {
    label: 'Lv1 Kyoto Tower',
    lng: kyotoTower[0],
    lat: kyotoTower[1],
    level: 1,
    want: '205235'
  },
  {
    label: 'Lv2 Kyoto Tower',
    lng: kyotoTower[0],
    lat: kyotoTower[1],
    level: 2,
    want: '20523536'
  },
  {
    label: 'Lv3 Kyoto Tower',
    lng: kyotoTower[0],
    lat: kyotoTower[1],
    level: 3,
    want: '2052353680'
  },
  {
    label: 'Lv4 Kyoto Tower',
    lng: kyotoTower[0],
    lat: kyotoTower[1],
    level: 4,
    want: '20523536804'
  },
  {
    label: 'Lv5 Kyoto Tower',
    lng: kyotoTower[0],
    lat: kyotoTower[1],
    level: 5,
    want: '205235368041'
  },
  {
    label: 'Lv6 Kyoto Tower',
    lng: kyotoTower[0],
    lat: kyotoTower[1],
    level: 6,
    want: '2052353680412'
  },
  {
    label: 'Lv1 Shibuya',
    lng: shibuya[0],
    lat: shibuya[1],
    level: 1,
    want: '205339'
  },
  {
    label: 'Lv2 Shibuya',
    lng: shibuya[0],
    lat: shibuya[1],
    level: 2,
    want: '20533935'
  },
  {
    label: 'Lv3 Shibuya',
    lng: shibuya[0],
    lat: shibuya[1],
    level: 3,
    want: '2053393595'
  },
  {
    label: 'Lv4 Shibuya',
    lng: shibuya[0],
    lat: shibuya[1],
    level: 4,
    want: '20533935954'
  },
  {
    label: 'Lv5 Shibuya',
    lng: shibuya[0],
    lat: shibuya[1],
    level: 5,
    want: '205339359542'
  },
  {
    label: 'Lv6 Shibuya',
    lng: shibuya[0],
    lat: shibuya[1],
    level: 6,
    want: '2053393595423'
  }
]

describe('run tests', () => {
  it('test toCode', () => {
    cases.forEach((c) => {
      expect(wgs.toCode(c.lng, c.lat, c.level)).toBe(c.want)
    })
  })
})
