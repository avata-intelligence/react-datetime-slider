var React = require('react');
var ReactDOM = require('react-dom');
var ReactDatetimeSlider = require('react-datetime-slider');

var App = React.createClass({
	render () {
		return (
			<div>
				<ReactDatetimeSlider />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
