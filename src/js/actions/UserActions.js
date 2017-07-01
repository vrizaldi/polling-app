import axios from "axios";

export function reset() {
	return {
		type: "RESET"
	};
}

export function login(username, password) {
	// let promise middleware do its thing
	return {
		type: "LOG_IN",
		payload: axios({
			method: "post",
			url: "/login", 
			data: {
				username,
				password
			},
			headers: {
				"Content-Type": "application/json"
			}
		})
	};
}

export function register(username, password) {
	return {
		type: "SIGN_UP",
		payload: axios({
			method: "post",
			url: "/register",
			data: {
				username,
				password
			},
			headers: {
				"Content-Type": "application/json"
			}
		})
	};
}