<h1 align="center">  
  <img src="/DigitalClocks.png" width="150"/>
  <br>  
  FormatHours 
</h1>  

<h4 align="center">Lightweight, zero-dependency library for hours formatting!</h4>  



[![Version npm][version]](https://www.npmjs.com/package/format-hours)
[![License: MIT][license]](https://opensource.org/licenses/MIT)
[![Minsize][minsize]](https://www.npmjs.com/package/format-hours)
![CodeQL](https://github.com/opa-oz/format-hours/workflows/CodeQL/badge.svg?branch=main)
![Node.js CI](https://github.com/opa-oz/format-hours/workflows/Node.js%20CI/badge.svg?branch=main)
[![codecov](https://codecov.io/gh/opa-oz/format-hours/branch/main/graph/badge.svg)](https://codecov.io/gh/opa-oz/format-hours)

## Installation
You can install `format-hours` using standard tools:
```bash
$> npm install format-hours
# or
$> yarn add format-hours
```

## Usage
```typescript
import formatTime from 'formatHours';

formatTime(9); // 9:00
formatTime(15); // 15:00

// Also works with float
formatTime(16.5); // 16:30
formatTime(6.25); // 6:15
formatTime(22.75); // 22:45

// Read about `options` below

// `timeFormat`
formatTime(22, { timeFormat: '12h' }); // 8:00
formatTime(13.5, { timeFormat: '12h' }); // 1:30

// AM/PM also available
formatTime(13.5, { timeFormat: 'AM-PM' }); // 1:30 PM
formatTime(0, { timeFormat: 'AM-PM' }); // 12:00 AM
formatTime(4, { timeFormat: 'AM-PM' }); // 4:00 AM
formatTime(12, { timeFormat: 'AM-PM' }); // 12:00 PM

// and customaziable
formatTime(12, { timeFormat: 'AM-PM', suffixes: [' a.m', ' p.m'] }); // 12:00 p.m.
formatTime(18.5, { timeFormat: 'AM-PM', suffixes: [' a.m', ' p.m'] }); // 6:30 p.m.

// `fullSize`
formatTime(7, { fullSize: true }); // 09:00
formatTime(1, { fullSize: true }); // 01:00

// `divider`
formatTime(23.5, { divider: '.' }); // 23.30
formatTime(11.2, { divider: '|' }); // 11|12

// 'removeOverflow'
formatTime(31.5, { removeOverflow: true }); // 7:30
formatTime(24, { removeOverflow: true }); // 00:00

// of course, you can combine them as you wish

// Or even use it with Dates
formatTime(new Date('March 13, 08 14:20')); // 14:20
formatTime(new Date('March 13, 08 14:20'), { divider: '.' }); // 14.20
```

## API

## formatTime
**Interface:**
```typescript
function formatTime(input: Date | number, options?: Options): string {
    // ...
}
```

### Options
|**Option**| **Type** | **Default** | **Description** |
|--|--|--|--|
| `timeFormat` | `'24h'/'12h'/'AM-PM''` | `'24h'` | The way of formatting hours |
| `divider` | `string` | `:` | Divider between hours and minutes |
| `fullSize` | `boolean` | `false` | Appends leading zero if hour less than 10 |
| `removeOverflow` | `boolean` | `false` | Trims extra-hours if input value more than 24 |
| `suffixes` | `[string, string]` | `[' AM', ' PM']` | Suffixes for `'AM-PM''` time format. `['<suffix if before noon>', '<siffux if after noon']` |

----
## Contributing
**Please, use PRs for your proposals.**

### Setting up local development
For start, just clone repo and install dependencies via `npm`/`yarn`:
```bash
$> git clone https://github.com/opa-oz/format-hours.git
$> yarn install
# or
$> npm install
```

### Tests
To run test, simply use command:
```bash
$> yarn test
#or
$> npm run test
```

### Lint & Prettier
Easy to check code style and formatting:
```bash
$> yarn lint && yarn prettier-format
```

## License
format-hours is copyright © 2020 [opa_oz](https://github.com/opa-oz). It is free software and may be redistributed under the terms specified in the [license](LICENSE).

[version]: http://img.shields.io/npm/v/format-hours.svg?style=flat-square
[license]: https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square
[pr]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[minsize]: https://img.shields.io/bundlephobia/min/format-hours?style=flat-square
