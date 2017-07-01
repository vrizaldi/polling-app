import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { login, reset } from "../actions/UserActions";


@connect((store) => {
	return {
		loggedIn: store.user.loggedIn,
		fetching: store.user.fetching
	}
}) export default class Login extends React.Component {

	componentWillMount() {
		this.props.dispatch(reset());
	}

	render() {
		// if logged in redirect to the profile
		var notification = "";
		if(this.props.loggedIn) {
			return(<Redirect to="/profile" />);
		} else if(this.props.fetching == "fetching") {
			return (<p>Fetching user data...</p>)
		} else if(this.props.fetching == "failed") {
			notification = "Invalid username and password combination"
		}

		// otherwise show login screen
		return(
			<div>
				<div id="notification"><p>{notification}</p></div>

				<input id="username" type="text"/>
				<input id="password" type="password"/>
				<button onClick={this.login.bind(this)}>Login</button>
				<p>Or click <Link to="/register">here</Link> to register</p>
			</div>
		);
	}

	login() {
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		this.props.dispatch(login(username, password));
	}
}