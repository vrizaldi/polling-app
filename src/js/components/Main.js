import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

export default class Main extends React.Component {
	render() {
		return(
			<main>
				<h1>JS works!</h1>
				<Redirect to="/login" />
				<Switch>					
					<Route exact path="/login" component={Login}/>
					<Route path="/profile" component={Profile}/>
					<Route path="/register" component={Register}/>
				</Switch>
			</main>
		);
	}
}