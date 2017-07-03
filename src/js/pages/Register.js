import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { register, reset } from "../actions/UserActions";
import Form from "../components/Form";
import Notif from "../components/Notif";

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
		if(this.props.fetching == "fetching")
			return (<p>Registering user...</p>);
		else if(this.props.fetching == "failed") 
			notification = "Register failed, username is used";
		else if(this.props.fetching == "success") 
			notification = "Register success";

		return(
			<div>
				<Notif text={notification}/>

				<Form action={this.register.bind(this)} label="Register"/>
				<p>Or click <Link to="/login">here</Link> to login</p>
			</div>
		);
	}

	register() {
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		this.props.dispatch(register(username, password));
	}
}