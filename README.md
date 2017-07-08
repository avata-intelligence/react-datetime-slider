# React Datetime Slider

A React component to select date and time with the ability to tick in real time.
Built on top of [rc-slider](https://www.npmjs.com/package/rc-slider) and [rc-tooltip](https://www.npmjs.com/package/rc-tooltip).

## Installation

```npm i react-datetime-slider```

## Usage

1. Import

```
import DatetimeSlider from 'react-datetime-slider';
```

2. Include CSS

```
import 'node_modules/react-datetime-slider/css/ReactDatetimeSlider.css';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
```

## Properties

| prop     | Type                    | Required |   |   |
|----------|-------------------------|----------|---|---|
| min      | Number (unix timestamp) | y        |   |   |
| max      | Number (unix timestamp) | y        |   |   |
| onChange | (timestamp) => Number   | n        |   |   |

## Example

```
<DatetimeSlider
  min={moment().subtract(1, 'hour').valueOf()}
  max={moment().valueOf()}
  onChange={console.log}
/>

```
*** Note Most [rc-slider](https://www.npmjs.com/package/rc-slider) props will apply to DatetimeSlider also, such as steps, dots etc.