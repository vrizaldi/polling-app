import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { createPoll, reset, deletePoll } from "../actions/UserActions";
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

	delete(pollID) {
		console.log(`Deleting ${pollID}...`);
		this.props.dispatch(deletePoll(
			this.props.username, 
			this.props.password, 
			pollID));
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
				<p>Logged in as {this.props.username}</p>

				{
					// list the administered poll
					this.props.adminPolls.map((poll) => {
						return(
							<div className="jumbotron poll-list">
								<Link to={"/poll?pollID=" + poll._id}>
									{poll.question}
								</Link>
								<Button 
									className="delete-poll btn btn-danger"
									click={this.delete.bind(this)}
									value={poll._id}
									label="Delete"/>
							</div>
						);
					})
				}

				<label for="question">Question:&nbsp;</label>
				<input id="question" type="input"/>
				<Button 
					className="btn btn-success"
					click={this.initPoll.bind(this)} 
					label="Ask the masse" />
			</div>
		);
	}
}