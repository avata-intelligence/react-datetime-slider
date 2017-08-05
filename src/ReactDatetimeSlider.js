import React, { Component, PropTypes } from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import FlatButton from 'material-ui/FlatButton';
import ReplayIcon from 'material-ui/svg-icons/av/replay';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import StopIcon from 'material-ui/svg-icons/av/stop';
import moment from 'moment';

// import './ReactDatetimeSlider.css';
// import 'rc-slider/assets/index.css';
// import 'rc-tooltip/assets/bootstrap.css';

// eslint-disable-next-line
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

const defaultProps = {
  interval: 1000,
  initRealtime: true,
  datetimeFormat: 'MM/DD/YY h:mm:ss a',
};

const propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  interval: PropTypes.number,
  onChange: PropTypes.func,
  initRealtime: PropTypes.bool,
  datetimeFormat: PropTypes.string,
};

const styles = {
  sliderContainer: {
    position: 'relative',
  },
  slider: {
    width: 'calc(100% - 210px)',
    height: 30,
    padding: '5px 0 0 0',
    margin: '0 0 0 110px',
    zIndex: 2,
  },
  startButton: {
    position: 'absolute',
    left: 0,
    top: -12,
  },
  nowButton: {
    position: 'absolute',
    right: 0,
    top: -12,
  },
};

class ReactDatetimeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.max,
      min: props.min,
      max: props.max,
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

  componentDidMount() {
    if (this.props.initRealtime) {
      this.onStartTicker();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.max,
      min: nextProps.min,
      max: nextProps.max,
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.ticker);
  }

  onChange(value) {
    this.onStopTicker();
    this.setState({ value }, this.emitValue);
  }

  onStartTicker() {
    this.ticker = window.setInterval(() => {
      const now = moment().valueOf();

      this.setState(
        {
          value: now,
          max: now,
          isIntervalRunning: true,
        },
        this.emitValue
      );
    }, this.props.interval);
  }

  onRestartTicker() {
    this.setState(
      {
        value: moment().valueOf(),
        max: moment().valueOf(),
        isIntervalRunning: true,
      },
      this.onStartTicker
    );
  }

  onStopTicker() {
    window.clearInterval(this.ticker);
    this.ticker = null;
    this.setState({
      isIntervalRunning: false,
    });
  }

  onStartTime() {
    this.onStopTicker();
    this.setState(
      {
        value: this.state.min,
      },
      this.emitValue
    );
  }

  getHandle(props) {
    const { value, index, ...restProps } = props;

    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={moment(value).format(this.props.datetimeFormat)}
        visible
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  }

  emitValue() {
    this.props.onChange(this.state.value);
  }

  render() {
    const { style, className, ...sliderProps } = this.props;
    const standardProps = { style, className };

    return (
      <div id="ReactDatetimeSlider" {...standardProps}>
        <div style={styles.sliderContainer}>
          <FlatButton
            style={styles.startButton}
            label="start"
            icon={<ReplayIcon />}
            onClick={this.onStartTime}
          />
          <Slider
            {...sliderProps}
            style={styles.slider}
            min={this.state.min}
            max={this.state.max}
            onChange={this.onChange}
            value={this.state.value}
            handle={this.getHandle}
          />
          {!this.state.isIntervalRunning &&
            <FlatButton
              style={styles.nowButton}
              label="now"
              icon={<PlayIcon />}
              onClick={this.onRestartTicker}
            />}
          {this.state.isIntervalRunning &&
            <FlatButton
              style={styles.nowButton}
              label="stop"
              icon={<StopIcon />}
              onClick={this.onStopTicker}
            />}
        </div>
      </div>
    );
  }
}

ReactDatetimeSlider.defaultProps = defaultProps;
ReactDatetimeSlider.propTypes = propTypes;
export default ReactDatetimeSlider;
