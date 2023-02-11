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
  cases.forEach((c) => {
    it(c.label, () => {
      expect(wgs.toCode(c.lng, c.lat, c.level)).toBe(c.want)
    })
  })

  const newDelhi = [77.2300193, 28.5645549]
  it('test east longitude and north latitude', () => {
    expect(wgs.toCode(newDelhi[0], newDelhi[1], 1)).toBe('104277')
    expect(wgs.toCode(newDelhi[0], newDelhi[1], 2)).toBe('10427761')
    expect(wgs.toCode(newDelhi[0], newDelhi[1], 3)).toBe('1042776178')
    expect(wgs.toCode(newDelhi[0], newDelhi[1], 4)).toBe('10427761783')
    expect(wgs.toCode(newDelhi[0], newDelhi[1], 5)).toBe('104277617832')
    expect(wgs.toCode(newDelhi[0], newDelhi[1], 6)).toBe('1042776178324')
  })

  it('test east longitude and north latitude', () => {
    expect(wgs.toCode(shibuya[0], shibuya[1], 1)).toBe('205339')
    expect(wgs.toCode(shibuya[0], shibuya[1], 2)).toBe('20533935')
    expect(wgs.toCode(shibuya[0], shibuya[1], 3)).toBe('2053393595')
    expect(wgs.toCode(shibuya[0], shibuya[1], 4)).toBe('20533935954')
    expect(wgs.toCode(shibuya[0], shibuya[1], 5)).toBe('205339359542')
    expect(wgs.toCode(shibuya[0], shibuya[1], 6)).toBe('2053393595423')
  })

  const london = [-0.1109842, 51.5116861]
  it('test west longitude and north latitude', () => {
    expect(wgs.toCode(london[0], london[1], 1)).toBe('307700')
    expect(wgs.toCode(london[0], london[1], 2)).toBe('30770020')
    expect(wgs.toCode(london[0], london[1], 3)).toBe('3077002018')
    expect(wgs.toCode(london[0], london[1], 4)).toBe('30770020182')
    expect(wgs.toCode(london[0], london[1], 5)).toBe('307700201824')
    expect(wgs.toCode(london[0], london[1], 6)).toBe('3077002018244')
  })

  const sanFran = [-122.4080423, 37.7614263]
  it('test west longitude and north latitude', () => {
    expect(wgs.toCode(sanFran[0], sanFran[1], 1)).toBe('405622')
    expect(wgs.toCode(sanFran[0], sanFran[1], 2)).toBe('40562253')
    expect(wgs.toCode(sanFran[0], sanFran[1], 3)).toBe('4056225312')
    expect(wgs.toCode(sanFran[0], sanFran[1], 4)).toBe('40562253122')
    expect(wgs.toCode(sanFran[0], sanFran[1], 5)).toBe('405622531223')
    expect(wgs.toCode(sanFran[0], sanFran[1], 6)).toBe('4056225312232')
  })

  const capeTown = [18.4311911, -33.9166467]
  it('test east longitude and south latitude', () => {
    expect(wgs.toCode(capeTown[0], capeTown[1], 1)).toBe('505018')
    expect(wgs.toCode(capeTown[0], capeTown[1], 2)).toBe('50501863')
    expect(wgs.toCode(capeTown[0], capeTown[1], 3)).toBe('5050186394')
    expect(wgs.toCode(capeTown[0], capeTown[1], 4)).toBe('50501863943')
    expect(wgs.toCode(capeTown[0], capeTown[1], 5)).toBe('505018639434')
    expect(wgs.toCode(capeTown[0], capeTown[1], 6)).toBe('5050186394344')
  })

  const sydney = [151.3218161, -33.8345541]
  it('test east longitude and south latitude', () => {
    expect(wgs.toCode(sydney[0], sydney[1], 1)).toBe('605051')
    expect(wgs.toCode(sydney[0], sydney[1], 2)).toBe('60505162')
    expect(wgs.toCode(sydney[0], sydney[1], 3)).toBe('6050516205')
    expect(wgs.toCode(sydney[0], sydney[1], 4)).toBe('60505162052')
    expect(wgs.toCode(sydney[0], sydney[1], 5)).toBe('605051620521')
    expect(wgs.toCode(sydney[0], sydney[1], 6)).toBe('6050516205214')
  })

  const rio = [-43.2240823, -23.0400003]
  it('test west longitude and south latitude', () => {
    expect(wgs.toCode(rio[0], rio[1], 1)).toBe('703443')
    expect(wgs.toCode(rio[0], rio[1], 2)).toBe('70344341')
    expect(wgs.toCode(rio[0], rio[1], 3)).toBe('7034434147')
    expect(wgs.toCode(rio[0], rio[1], 4)).toBe('70344341474')
    expect(wgs.toCode(rio[0], rio[1], 5)).toBe('703443414744')
    expect(wgs.toCode(rio[0], rio[1], 6)).toBe('7034434147442')
  })

  const tahiti = [-149.5758584, -17.5364235]
  it('test west longitude and south latitude', () => {
    expect(wgs.toCode(tahiti[0], tahiti[1], 1)).toBe('802649')
    expect(wgs.toCode(tahiti[0], tahiti[1], 2)).toBe('80264924')
    expect(wgs.toCode(tahiti[0], tahiti[1], 3)).toBe('8026492446')
    expect(wgs.toCode(tahiti[0], tahiti[1], 4)).toBe('80264924461')
    expect(wgs.toCode(tahiti[0], tahiti[1], 5)).toBe('802649244613')
    expect(wgs.toCode(tahiti[0], tahiti[1], 6)).toBe('8026492446131')
  })
})
