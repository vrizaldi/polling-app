"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;
// for the currently shown poll
var initialStates = {
	loaded: false,
	fetching: "none",
	error: false,
	pollData: {
		opt: []
	}
};

function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStates;
	var action = arguments[1];

	switch (action.type) {

		case "LOAD_PENDING":
			return _extends({}, state, {
				fetching: "fetching"
			});

		case "LOAD_FULFILLED":
			return _extends({}, state, {
				pollData: {
					opt: action.payload.data.opt
				},
				fetching: "success"
			});

		case "LOAD_REJECTED":
			return _extends({}, state, {
				fetching: "none",
				error: true
			});

		case "VOTE":
			return state;
	}
	return state;
}