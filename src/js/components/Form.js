import React from "react";

export default class Form extends React.Component {
	render() {
		return(
			<div class="form">
				<label for="username">Username: </label>
				<input id="username" type="input"/>
				<label for="password">Password: </label>
				<input id="password" type="password"/>
				<button onClick={this.props.action}>{this.props.label}</button>
			</div>
		);
	}
}