import React from "react";

export default class Button extends React.Component {
	
	click() {
		this.props.click(this.props.value);
	}
	
	render() {
		return(
			<button 
				onClick={this.click.bind(this)} 
				value={this.props.value}>
				{this.props.label}
			</button>
		);
	}
}