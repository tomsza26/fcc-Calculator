import React from 'react';

class Calculator extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { calcValue } = this.props;
		let { history } = this.props;

		return (
			<div id="calculator-main">
				<div id="history">{history}</div>
				<div id="display">{calcValue}</div>
				<button name="AC" id="clear" onClick={(e) => this.props.onClick(e.target.name)}>
					AC
				</button>
				<button name="/" onClick={(e) => this.props.onClick(e.target.name)} id="divide">
					/
				</button>
				<button name="*" onClick={(e) => this.props.onClick(e.target.name)} id="multiply">
					x
				</button>
				<button name="7" onClick={(e) => this.props.onClick(e.target.name)} id="seven">
					7
				</button>
				<button name="8" onClick={(e) => this.props.onClick(e.target.name)} id="eight">
					8
				</button>
				<button name="9" onClick={(e) => this.props.onClick(e.target.name)} id="nine">
					9
				</button>
				<button name="-" onClick={(e) => this.props.onClick(e.target.name)} id="subtract">
					-
				</button>
				<button name="4" onClick={(e) => this.props.onClick(e.target.name)} id="four">
					4
				</button>
				<button name="5" onClick={(e) => this.props.onClick(e.target.name)} id="five">
					5
				</button>
				<button name="6" onClick={(e) => this.props.onClick(e.target.name)} id="six">
					6
				</button>
				<button name="+" onClick={(e) => this.props.onClick(e.target.name)} id="add">
					+
				</button>
				<button name="1" onClick={(e) => this.props.onClick(e.target.name)} id="one">
					1
				</button>
				<button name="2" onClick={(e) => this.props.onClick(e.target.name)} id="two">
					2
				</button>
				<button name="3" onClick={(e) => this.props.onClick(e.target.name)} id="three">
					3
				</button>
				<button name="=" onClick={(e) => this.props.onClick(e.target.name)} id="equals">
					=
				</button>
				<button name="0" onClick={(e) => this.props.onClick(e.target.name)} id="zero">
					0
				</button>
				<button name="." onClick={(e) => this.props.onClick(e.target.name)} id="decimal">
					.
				</button>
			</div>
		);
	}
}

export default Calculator;
