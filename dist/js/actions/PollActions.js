"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.load = load;
exports.reset = reset;
exports.vote = vote;
exports.createOpt = createOpt;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function load(pollID) {
	return {
		type: "LOAD",
		payload: _axios2.default.get("/getpoll?pollID=" + pollID)
	};
}

function reset() {
	return {
		type: "RESET"
	};
}

function vote(pollID, optID) {
	return {
		type: "VOTE",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/vote",
			data: {
				_id: pollID,
				optID: optID
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}

function createOpt(pollID, opt) {
	return {
		type: "ADD_OPT",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/newopt",
			data: {
				_id: pollID,
				opt: opt
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}