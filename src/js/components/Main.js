import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Poll from "../pages/Poll";

export default class Main extends React.Component {
	render() {
		return(
			<main>
				<Switch>					
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login}/>
					<Route path="/profile" component={Profile}/>
					<Route path="/register" component={Register}/>
					<Route path="/poll" component={Poll}/>
				</Switch>
			</main>
		);
	}
}
