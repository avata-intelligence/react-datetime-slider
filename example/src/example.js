import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDatetimeSlider from 'react-datetime-slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
	position: 'absolute',
	left: 100,
	top: 100,
	width: 600,
	height: 50,
};

class App extends Component {
	onChange() {

	}

	render() {
		return (
			<div>
  			<MuiThemeProvider>
					<ReactDatetimeSlider
						onChange={this.onChange}
						style={style}
						min={0}
						max={2}
					/>
				</MuiThemeProvider>
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));
