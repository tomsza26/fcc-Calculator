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
			if (this.state.history == 'DIGIT LIMIT MET') {
			} else if (this.state.history.length < 20) {
				const regex = new RegExp(/[/*+]/);
				if (this.state.calcValue.includes('=') && !isNaN(button)) {
					this.setState({
						calcValue: button,
						history: button
					});
				} else if (this.state.calcValue.includes('=') && isNaN(button)) {
					this.setState({
						calcValue: this.state.history + button,
						history: button
					});
				} else if (
					(button == '-' && this.state.history[this.state.history.length - 1] == '-') ||
					(this.state.history == '0' && regex.test(button))
				) {
				} else if (
					(this.state.history.slice(-1).includes('.') && button == '.') ||
					((this.state.calcValue == '0' || this.state.calcValue == '-') && regex.test(button))
				) {
				} else if (this.state.calcValue == '-0' && button == '0') {
				} else if (
					this.state.calcValue[this.state.calcValue.length - 1] == '-' &&
					regex.test(this.state.calcValue[this.state.calcValue.length - 2]) &&
					isNaN(button)
				) {
					let temporary = this.state.calcValue.substring(0, this.state.calcValue.length - 2);
					this.setState({
						history: button,
						calcValue: temporary + button
					});
				} else if (regex.test(this.state.calcValue.slice(-1)) && button == '-') {
					this.setState({
						history: button,
						calcValue: this.state.calcValue + button
					});
				} else if (isNaN(this.state.calcValue[this.state.calcValue.length - 1]) && isNaN(button)) {
					this.setState({
						history: button,
						calcValue: this.state.calcValue.replace(/.$/, button)
					});
				} else if (this.state.history == '0' && button == '.' && this.state.calcValue != '0') {
					this.setState({
						history: this.state.history + button,
						calcValue: this.state.calcValue + button
					});
				} else if (this.state.history == '0' && button == '.') {
					this.setState({
						history: '0.',
						calcValue: '0.'
					});
				} else if (regex.test(button) || regex.test(this.state.history)) {
					this.setState({
						history: button,
						calcValue: this.state.calcValue + button
					});
				} else if (this.state.history == '0') {
					this.setState({
						history: button,
						calcValue: button
					});
				} else if (this.state.history.includes('.') && button == '.') {
				} else if (!isNaN(this.state.calcValue) && button == '-') {
					this.setState({
						history: button,
						calcValue: this.state.calcValue + button
					});
				} else {
					this.setState({
						history: this.state.history + button,
						calcValue: this.state.calcValue + button
					});
				}
			} else {
				const regex2 = new RegExp(/[/*+-]/);
				if (regex2.test(button)) {
					this.setState({
						history: button,
						calcValue: this.state.calcValue + button
					});
				} else {
					let current = this.state.calcValue;
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
