import React from "react";
import { connect } from "react-redux";

@connect((store) => {
	return {
		fetching: store.poll.fetching,
		loaded: store.poll.loaded,
		opt: store.poll.pollData.opt
	}
}) export default class Poll extends React.Component {
	componentWillMount() {
		// load poll
		console.log("location", this.prop.location);
	}

	render() {
		return(
			<div>
				<div id="graph">{
					// list current the count
					this.props.opt.map(function(opt) {
						return opt.count;
					})
				}</div>

				{
					this.props.opt.map(
						function(opt) {
							// list the option as buttons
							return(<button onClick={this.vote.bind(this)} value={opt.label}>{opt.label}</button>);
						})
				}
			</div>
		);
	}
}