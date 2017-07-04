import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"; 

@connect((store) => {
	return {
		loggedIn: store.user.loggedIn
	}
}) export default class Header extends React.Component {
	render() {
		return(
			<div className="navbar fixed-top">
				
				{this.props.loggedIn ? 
					(
						<ul className="nav navbar-nav">
							<li className="nav-item">
								<Link className="nav-link" to="/profile">Profile</Link>
							</li>
						</ul>
					) : (
						<ul class="nav navbar-nav">
							<li className="nav-item">
								<Link className="nav-link" to="/login">Login</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/register">Register</Link>
							</li>
						</ul>
					)
				}
			</div>
		);
	}
}