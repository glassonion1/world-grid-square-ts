# World Grid Square
The world grid square is extension of JIS X0410 worldwide.This library is utilities for the world grid square.

World grid square outlined here: https://www.fttsus.org/worldgrids/en/top-en/

## Compartment type
- 1st level 80km grid
- 2nd level 10km grid
- 3rd level 1km grid
- 4th level 500m grid
- 5th level 250m grid
- 6th level 125m grid

## Install
```
$ npm install world-grid-square
```
or
```
$ yarn add world-grid-square
```

## Usage
from longitude and latitude to code
```ts
import wgs from 'world-grid-square'

const code = wgs.toCode(139.745433, 35.658581, 6)
// 2053393599212
console.log(code)
```
from code to longitude and latitude
```ts
import wgs from 'world-grid-square'

const point = wgs.toPoint('2053393599212')
// 139.7453125, 35.65833333333333
console.log(point)
```
