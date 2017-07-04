"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.reset = reset;
exports.login = login;
exports.register = register;
exports.createPoll = createPoll;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reset() {
	return {
		type: "RESET"
	};
}

function login(username, password) {
	// let promise middleware do its thing
	return {
		type: "LOG_IN",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/login",
			data: {
				username: username,
				password: password
			},
			headers: {
				"Content-Type": "application/json"
			}
		})
	};
}

function register(username, password) {
	return {
		type: "SIGN_UP",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/register",
			data: {
				username: username,
				password: password
			},
			headers: {
				"Content-Type": "application/json"
			}
		})
	};
}

function createPoll(username, password, question) {
	return {
		type: "CREATE_POLL",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/newpoll",
			data: {
				username: username,
				password: password,
				question: question
			},
			headers: {
				"Content-Type": "application/json"
			}
		})
	};
}