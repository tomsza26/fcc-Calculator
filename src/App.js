import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Calculator from './components/Calculator';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			calcValue: 0,
			history: 0
		};
	}

	clearDisplay = () => {
		this.setState({
			calcValue: 0,
			history: 0
		});
	};

	onClick = (button) => {
		if (button === '=') {
			this.calc();
		} else if (button === 'AC') {
			this.clear();
		} else {
			if (this.state.calcValue == 0 && button == '.') {
				this.setState({
					calcValue: '0.'
				});
			} else if (this.state.calcValue == 0 && button == 0) {
			} else if (this.state.calcValue == '0') {
				this.setState({
					calcValue: button
				});
			} else {
				this.setState({
					calcValue: this.state.calcValue + button
				});
			}
		}
	};

	calc = () => {
		let testing = this.state.calcValue;
		try {
			this.setState({
				calcValue: eval(testing)
			});
		} catch (e) {
			this.setState({
				calcValue: 'error'
			});
		}
	};

	clear = () => {
		this.setState({
			calcValue: 0,
			history: 0
		});
	};

	render() {
		return (
			<div className="App">
				<Calculator calcValue={this.state.calcValue} history={this.state.history} onClick={this.onClick} />
			</div>
		);
	}
}

export default App;
