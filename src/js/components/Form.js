import React from "react";

export default class Form extends React.Component {
	render() {
		return(
			<div class="form">
				<label for="username">Username:&nbsp;</label>
				<input id="username" type="input"/><br/>
				<label for="password">Password:&nbsp;</label>
				<input id="password" type="password"/><br/>
				<button className="btn btn-primary" onClick={this.props.action}>{this.props.label}</button>
			</div>
		);
	}
}