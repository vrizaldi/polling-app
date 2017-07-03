import React from "react";
import { StaticRouter } from "react-router";
import { Provider } from "react-redux";

import App from "../js/App";
import store from "../js/store";

export default class Client extends React.Component {
	render() {
		return(
			<Provider store={store}>
				<StaticRouter
					location={this.props.location}
					context={this.props.context}>
					<App/>
				</StaticRouter>
			</Provider>
		);
	}
}