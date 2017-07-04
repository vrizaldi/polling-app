import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { createPoll, reset } from "../actions/UserActions";
import Button from "../components/Button";

@connect((store) => {
	return {
		fetching: store.user.fetching,
		loggedIn: store.user.loggedIn,
		username: store.user.userData.username,
		password: store.user.userData.password,
		adminPolls: store.user.userData.adminPolls,
		bio: store.user.userData.bio
	}
}) export default class Profile extends React.Component {

	componentWillMount() {
		this.props.dispatch(reset());
	}

	initPoll() {
		var question = document.getElementById("question").value;
		console.log("question:", question);
		this.props.dispatch(createPoll(
			this.props.username, 
			this.props.password, 
			question));
	}
		
	render() {
		if(!this.props.loggedIn) {
			// if isn't logged in redirect to login screen
			return(<Redirect to="/" />);
		} else if(this.props.fetching == "fetching") {
			return(<p>Fetching user data...</p>);
		}

		// otherwise show user profile
		return(
			<div>
				<p>Logged in</p>
				<p>Username: {this.props.username}</p>
				<p>Bio: {this.props.bio}</p>

				{
					// list the administered poll
					this.props.adminPolls.map(function(poll) {
						return(
							<p><Link to={"/poll?pollID=" + poll._id}>
								{poll.question}
							</Link></p>
						);
					})
				}

				<label for="question">Question:</label>
				<input id="question" type="input"/>
				<Button 
					click={this.initPoll.bind(this)} 
					label="Ask the masse" />
			</div>
		);
	}
}