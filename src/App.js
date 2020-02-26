/*eslint eqeqeq: "off"*/
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Calculator from './components/Calculator';
import { evaluate } from 'mathjs';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			calcValue: '0',
			history: '0'
		};
	}

	onClick = (button) => {
		if (button === '=') {
			this.calc();
		} else if (button === 'AC') {
			this.clear();
		} else {
			let stateCalcVal = this.state.calcValue;
			let stateHis = this.state.history;

			if (stateHis == 'DIGIT LIMIT MET') {
			} else if (stateHis.length < 20) {
				const regex = new RegExp(/[/*+]/);
				if (stateCalcVal.includes('=') && !isNaN(button)) {
					this.setState({
						calcValue: button,
						history: button
					});
				} else if (stateCalcVal.includes('=') && isNaN(button)) {
					this.setState({
						calcValue: stateHis + button,
						history: button
					});
				} else if (
					(button == '-' && stateHis[stateHis.length - 1] == '-') ||
					(stateHis == '0' && regex.test(button))
				) {
				} else if (
					(stateHis.slice(-1).includes('.') && button == '.') ||
					((stateCalcVal == '0' || stateCalcVal == '-') && regex.test(button))
				) {
				} else if (stateCalcVal == '-0' && button == '0') {
				} else if (
					stateCalcVal[stateCalcVal.length - 1] == '-' &&
					regex.test(stateCalcVal[stateCalcVal.length - 2]) &&
					isNaN(button)
				) {
					let temporary = stateCalcVal.substring(0, stateCalcVal.length - 2);
					this.setState({
						history: button,
						calcValue: temporary + button
					});
				} else if (regex.test(stateCalcVal.slice(-1)) && button == '-') {
					this.setState({
						history: button,
						calcValue: stateCalcVal + button
					});
				} else if (isNaN(stateCalcVal[stateCalcVal.length - 1]) && isNaN(button)) {
					this.setState({
						history: button,
						calcValue: stateCalcVal.replace(/.$/, button)
					});
				} else if (stateHis == '0' && button == '.' && stateCalcVal != '0') {
					this.setState({
						history: stateHis + button,
						calcValue: stateCalcVal + button
					});
				} else if (stateHis == '0' && button == '.') {
					this.setState({
						history: '0.',
						calcValue: '0.'
					});
				} else if (regex.test(button) || regex.test(stateHis)) {
					this.setState({
						history: button,
						calcValue: stateCalcVal + button
					});
				} else if (stateHis == '0') {
					this.setState({
						history: button,
						calcValue: button
					});
				} else if (stateHis.includes('.') && button == '.') {
				} else if (!isNaN(stateCalcVal) && button == '-') {
					this.setState({
						history: button,
						calcValue: stateCalcVal + button
					});
				} else {
					this.setState({
						history: stateHis + button,
						calcValue: stateCalcVal + button
					});
				}
			} else {
				const regex2 = new RegExp(/[/*+-]/);
				if (regex2.test(button)) {
					this.setState({
						history: button,
						calcValue: stateCalcVal + button
					});
				} else {
					let current = stateCalcVal;
					this.setState({
						history: 'DIGIT LIMIT MET'
					});
					setTimeout(() => this.setState({ history: current }), 1200);
				}
			}
		}
	};

	calc = () => {
		let testing = this.state.calcValue;
		if (isNaN(testing.charAt(testing.length - 1))) {
			testing = testing.substring(0, testing.length - 1);
		}
		try {
			this.setState({
				calcValue: testing + '=' + evaluate(testing).toString(),
				history: evaluate(testing).toString()
			});
		} catch (e) {}
	};

	clear = () => {
		this.setState({
			calcValue: '0',
			history: '0'
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
