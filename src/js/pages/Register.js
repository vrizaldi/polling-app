import React from "react";
import { connect } from "react-redux";

import { register, reset } from "../actions/UserActions";

@connect((store) => {
	// allow dispatch
	return {
		fetching: store.user.fetching
	};
}) export default class Register extends React.Component {

	constructor() {
		super();

		this.insufficient = false;
	}

	componentWillMount() {
		this.props.dispatch(reset());
	}

	render() {
		var notification = "";
		console.log(this.props.fetching);
		if(this.props.fetching == "failed") 
			notification = "Register failed, username is used";
		else if(this.props.fetching == "success") 
			notification = "Register success";

		return(
			<div>
				<div id="notification"><p>{notification}</p></div>

				<label for="username">Username: </label>
				<input id="username" type="input"/>
				<label for="password">Password: </label>
				<input id="password" type="password"/>
				<button onClick={this.register.bind(this)}>Register</button>
			</div>
		);
	}

	register() {
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		this.props.dispatch(register(username, password));
	}
}