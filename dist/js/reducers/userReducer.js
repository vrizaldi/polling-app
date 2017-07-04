"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;
var initialStates = {
	loggedIn: false,
	fetching: "none",
	error: false,
	userData: {
		username: "",
		password: "",
		bio: "",
		adminPolls: [],
		participatePolls: []
	}
};
function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStates;
	var action = arguments[1];

	switch (action.type) {
		case "RESET":
			// reset the fetching and error flags
			return _extends({}, state, {
				fetching: "none",
				error: false
			});

		// login cases ------------------
		case "LOG_IN_PENDING":
			// tell the UI that it's fetching
			return _extends({}, state, {
				fetching: "fetching"
			});
		case "LOG_IN_FULFILLED":
			if (action.payload.data.success !== false) {
				// login success
				return _extends({}, state, {
					userData: {
						username: action.payload.data.username,
						password: action.payload.data.password,
						bio: action.payload.data.bio,
						adminPolls: action.payload.data.adminPolls,
						participatePolls: []
					},
					loggedIn: true,
					fetching: "none"
				});
			} else {
				// login failed
				return _extends({}, state, {
					fetching: "failed"
				});
			}

		case "LOG_IN_REJECTED":
			return _extends({}, state, {
				error: true
			});

		// sign up cases --------------------
		case "SIGN_UP_PENDING":
			return _extends({}, state, {
				fetching: "fetching"
			});

		case "SIGN_UP_FULFILLED":
			if (action.payload.data.success == true) {
				// sign up success
				return _extends({}, state, {
					fetching: "success"
				});
			} else {
				// sign up failed
				return _extends({}, state, {
					fetching: "failed"
				});
			}

		case "SIGN_UP_REJECTED":
			return _extends({}, state, {
				error: true
			});

		case "CREATE_POLL_PENDING":
			return _extends({}, state, {
				fetching: "fetching"
			});

		case "CREATE_POLL_FULFILLED":
			var adminPolls = state.userData.adminPolls.splice(0);
			// clone it
			adminPolls.push({
				_id: action.payload.data._id,
				question: action.payload.data.question
			});
			console.log("success adding poll");
			return _extends({}, state, {
				userData: _extends({}, state.userData, {
					adminPolls: adminPolls
				}),
				fetching: "success"
			});

		case "CREATE_POLL_REJECTED":
			return _extends({}, state, {
				fetching: "failed"
			});
	}

	return state;
}