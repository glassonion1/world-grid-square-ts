# World Grid Square
[![npm version](https://badge.fury.io/js/global-mercator.svg)](https://badge.fury.io/js/world-grid-square)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/glassonion1/world-grid-square-ts/main/LICENSE)

The world grid square is extension of JIS X0410(a.k.a Japan Mesh Code) worldwide. This library is utilities for the world grid square.

World grid square outlined here: https://www.fttsus.org/worldgrids/en/top-en/

## Compartment type
- 1st level 80km grid
- 2nd level 10km grid
- 3rd level 1km grid
- 4th level 500m grid
- 5th level 250m grid
- 6th level 125m grid
- 7th level 25m grid(extension spec)
- 8th level 12.5m grid(extension spec)
- 9th level 5m grid(extension spec)

## Install
```
$ npm install world-grid-square
```
or
```
$ yarn add world-grid-square
```
or
```
$ pnpm add world-grid-square
```

## Usage
from longitude and latitude to code
```ts
import wgs from 'world-grid-square'

const code = wgs.pointToCode(139.745433, 35.658581, 6)
// 2053393599212
console.log(code)
```
from code to longitude and latitude
```ts
import { wgs } from 'world-grid-square'

const point = wgs.codeToPoint('2053393599212')
// 139.7453125, 35.65833333333333
console.log(point)
```
## Usage for JIS Grid Square
from longitude and latitude to jis code
```ts
import { wgs } from 'world-grid-square'

const code = wgs.pointToJisCode(139.745433, 35.658581, 6)
// 53393599212
console.log(code)
```
from jis code to longitude and latitude
```ts
import { wgs } from 'world-grid-square'

const point = wgs.jisCodeToPoint('53393599212')
// 139.7453125, 35.65833333333333
console.log(point)
```

## Demo using map
Here is a demo that actually draws the world grid square on the map using this library.  
https://9revolution9.com/tools/geo/geocode/
