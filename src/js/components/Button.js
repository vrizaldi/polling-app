import React from "react";

export default class Button extends React.Component {
	
	click() {
		this.props.click(this.props.value);
	}
	
	render() {
		return(
			<button className="btn"
				onClick={this.click.bind(this)} 
				value={this.props.value}
				className={this.props.className}>
				{this.props.label}
			</button>
		);
	}
}