import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

@connect((store) => {
	return {
		loggedIn: store.user.loggedIn,
		username: store.user.userData.username,
		bio: store.user.userData.bio
	}
}) export default class Profile extends React.Component {
	
	render() {
		if(!this.props.loggedIn) {
			// if isn't logged in redirect to login screen
			return(<Redirect to="/" />);
		}

		// otherwise show user profile
		return(
			<div>
				<p>Logged in</p>
				<p>Username: {this.props.username}</p>
				<p>Bio: {this.props.bio}</p>
			</div>
		);
	}
}