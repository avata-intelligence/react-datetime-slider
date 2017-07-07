'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _materialUiFlatButton = require('material-ui/FlatButton');

var _materialUiFlatButton2 = _interopRequireDefault(_materialUiFlatButton);

var _materialUiSvgIconsAvReplay = require('material-ui/svg-icons/av/replay');

var _materialUiSvgIconsAvReplay2 = _interopRequireDefault(_materialUiSvgIconsAvReplay);

var _materialUiSvgIconsAvPlayArrow = require('material-ui/svg-icons/av/play-arrow');

var _materialUiSvgIconsAvPlayArrow2 = _interopRequireDefault(_materialUiSvgIconsAvPlayArrow);

var _materialUiSvgIconsAvStop = require('material-ui/svg-icons/av/stop');

var _materialUiSvgIconsAvStop2 = _interopRequireDefault(_materialUiSvgIconsAvStop);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

// import './ReactDatetimeSlider.css';
// import 'rc-slider/assets/index.css';
// import 'rc-tooltip/assets/bootstrap.css';

// eslint-disable-next-line
var createSliderWithTooltip = _rcSlider2['default'].createSliderWithTooltip;
var Handle = _rcSlider2['default'].Handle;

var defaultProps = {
  interval: 1000,
  initRealtime: true,
  datetimeFormat: 'MM/DD/YY h:mm:ss a'
};

var propTypes = {
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  min: _react.PropTypes.number,
  max: _react.PropTypes.number,
  interval: _react.PropTypes.number,
  onChange: _react.PropTypes.func,
  initRealtime: _react.PropTypes.bool,
  datetimeFormat: _react.PropTypes.string
};

var styles = {
  sliderContainer: {
    position: 'relative'
  },
  slider: {
    width: 'calc(100% - 210px)',
    height: 30,
    padding: '5px 0 0 0',
    margin: '0 0 0 110px',
    zIndex: 2
  },
  startButton: {
    position: 'absolute',
    left: 0,
    top: -12
  },
  nowButton: {
    position: 'absolute',
    right: 0,
    top: -12
  }
};

var ReactDatetimeSlider = (function (_Component) {
  _inherits(ReactDatetimeSlider, _Component);

  function ReactDatetimeSlider(props) {
    _classCallCheck(this, ReactDatetimeSlider);

    _get(Object.getPrototypeOf(ReactDatetimeSlider.prototype), 'constructor', this).call(this, props);
    this.state = {
      value: props.max,
      min: props.min,
      max: props.max
    };

    this.ticker = null;

    this.onChange = this.onChange.bind(this);
    this.onStopTicker = this.onStopTicker.bind(this);
    this.onStartTicker = this.onStartTicker.bind(this);
    this.onRestartTicker = this.onRestartTicker.bind(this);
    this.onStartTime = this.onStartTime.bind(this);
    this.getHandle = this.getHandle.bind(this);
    this.emitValue = this.emitValue.bind(this);
  }

  _createClass(ReactDatetimeSlider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.initRealtime) {
        this.onStartTicker();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        value: nextProps.max,
        min: nextProps.min,
        max: nextProps.max
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      this.onStopTicker();
      this.setState({ value: value }, this.emitValue);
    }
  }, {
    key: 'onStartTicker',
    value: function onStartTicker() {
      var _this = this;

      this.ticker = window.setInterval(function () {
        var now = (0, _moment2['default'])().valueOf();

        _this.setState({
          value: now,
          max: now,
          isIntervalRunning: true
        }, _this.emitValue);
      }, this.props.interval);
    }
  }, {
    key: 'onRestartTicker',
    value: function onRestartTicker() {
      this.setState({
        value: (0, _moment2['default'])().valueOf(),
        max: (0, _moment2['default'])().valueOf(),
        isIntervalRunning: true
      }, this.onStartTicker);
    }
  }, {
    key: 'onStopTicker',
    value: function onStopTicker() {
      window.clearInterval(this.ticker);
      this.ticker = null;
      this.setState({
        isIntervalRunning: false
      });
    }
  }, {
    key: 'onStartTime',
    value: function onStartTime() {
      this.onStopTicker();
      this.setState({
        value: this.state.min
      }, this.emitValue);
    }
  }, {
    key: 'getHandle',
    value: function getHandle(props) {
      var value = props.value;
      var index = props.index;

      var restProps = _objectWithoutProperties(props, ['value', 'index']);

      return _react2['default'].createElement(
        _rcTooltip2['default'],
        {
          prefixCls: 'rc-slider-tooltip',
          overlay: (0, _moment2['default'])(value).format(this.props.datetimeFormat),
          visible: true,
          placement: 'top',
          key: index
        },
        _react2['default'].createElement(Handle, _extends({ value: value }, restProps))
      );
    }
  }, {
    key: 'emitValue',
    value: function emitValue() {
      this.props.onChange(this.state.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var style = _props.style;
      var className = _props.className;

      var sliderProps = _objectWithoutProperties(_props, ['style', 'className']);

      var standardProps = { style: style, className: className };

      return _react2['default'].createElement(
        'div',
        _extends({ id: 'ReactDatetimeSlider' }, standardProps),
        _react2['default'].createElement(
          'div',
          { style: styles.sliderContainer },
          _react2['default'].createElement(_materialUiFlatButton2['default'], {
            style: styles.startButton,
            label: 'start',
            icon: _react2['default'].createElement(_materialUiSvgIconsAvReplay2['default'], null),
            onClick: this.onStartTime
          }),
          _react2['default'].createElement(_rcSlider2['default'], _extends({}, sliderProps, {
            style: styles.slider,
            min: this.state.min,
            max: this.state.max,
            onChange: this.onChange,
            value: this.state.value,
            handle: this.getHandle
          })),
          !this.state.isIntervalRunning && _react2['default'].createElement(_materialUiFlatButton2['default'], {
            style: styles.nowButton,
            label: 'now',
            icon: _react2['default'].createElement(_materialUiSvgIconsAvPlayArrow2['default'], null),
            onClick: this.onRestartTicker
          }),
          this.state.isIntervalRunning && _react2['default'].createElement(_materialUiFlatButton2['default'], {
            style: styles.nowButton,
            label: 'stop',
            icon: _react2['default'].createElement(_materialUiSvgIconsAvStop2['default'], null),
            onClick: this.onStopTicker
          })
        )
      );
    }
  }]);

  return ReactDatetimeSlider;
})(_react.Component);

ReactDatetimeSlider.defaultProps = defaultProps;
ReactDatetimeSlider.propTypes = propTypes;
exports['default'] = ReactDatetimeSlider;
module.exports = exports['default'];