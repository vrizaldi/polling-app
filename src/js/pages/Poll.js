import React from "react";
import { connect } from "react-redux";
import queryString from "query-string";

import { load, vote, createOpt } from "../actions/PollActions";
import Button from "../components/Button";

@connect((store) => {
	return {
		fetching: store.poll.fetching,
		loaded: store.poll.loaded,
		_id: store.poll.pollData._id,
		question: store.poll.pollData.question,
		opt: store.poll.pollData.opt
	}
}) export default class Poll extends React.Component {
	
	componentDidMount() {
		console.log("Fetching...");
		this.load();	
	}

	vote(optID) {
		console.log("Voted", this.props.opt[optID].answer, "in",
			this.props._id);
		this.props.dispatch(vote(this.props._id, optID));
	}

	load() {
		// load poll	
		const pollID = queryString
			.parse(this.props.location.search)
			.pollID;
		console.log("loading poll", pollID);
		this.props.dispatch(load(pollID));
	}

	newOpt() {
		var opt = document.getElementById("new-opt").value;
		this.props.dispatch(createOpt(this.props._id, opt));
		console.log("new opt:", opt);
	}

	render() {
		if(this.props.fetching == "none") {
			return(<button onClick={this.load.bind(this)}>Click if graph doesn't load</button>);
		}
		if(this.props.fetching == "fetching") {
			return(<p>Fetching polls...</p>);
		} 
		return(
			<div>
				<h1>{this.props.question}</h1>
				<div id="graph">{
					// list current the count
					this.props.opt.map(function(opt) {
						return opt.count;
					})
				}</div>

				{
					this.props.opt.map(
						(opt, optID) => {
							// list the option as buttons
							return(<Button 
								click={this.vote.bind(this)} 
								value={optID}
								label={opt.answer} />);
						})
				}
				<input id="new-opt"/>
				<Button click={this.newOpt.bind(this)} label="+"/>
			</div>
		);
	}
}