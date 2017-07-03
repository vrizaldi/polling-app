import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

@connect((store) => {
		return { loggedIn: store.user.loggedIn };
}) export default class Home extends React.Component {
	render() {
		if(this.props.loggedIn) {
			return(<Redirect to="/profile"/>);

		} else {
			return(
				<div>
					<p>Click <Link to="/login">here</Link> to login</p>
					<p>or click <Link to="/register">here</Link> if you're new</p>
				</div>
			);
		}
	}
}
