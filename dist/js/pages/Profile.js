"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _UserActions = require("../actions/UserActions");

var _Button = require("../components/Button");

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Profile = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		fetching: store.user.fetching,
		loggedIn: store.user.loggedIn,
		username: store.user.userData.username,
		password: store.user.userData.password,
		adminPolls: store.user.userData.adminPolls,
		bio: store.user.userData.bio
	};
}), _dec(_class = function (_React$Component) {
	_inherits(Profile, _React$Component);

	function Profile() {
		_classCallCheck(this, Profile);

		return _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).apply(this, arguments));
	}

	_createClass(Profile, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			this.props.dispatch((0, _UserActions.reset)());
		}
	}, {
		key: "initPoll",
		value: function initPoll() {
			var question = document.getElementById("question").value;
			console.log("question:", question);
			this.props.dispatch((0, _UserActions.createPoll)(this.props.username, this.props.password, question));
		}
	}, {
		key: "delete",
		value: function _delete(pollID) {
			console.log("Deleting " + pollID + "...");
			this.props.dispatch((0, _UserActions.deletePoll)(this.props.username, this.props.password, pollID));
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			if (!this.props.loggedIn) {
				// if isn't logged in redirect to login screen
				return _react2.default.createElement(_reactRouterDom.Redirect, { to: "/" });
			} else if (this.props.fetching == "fetching") {
				return _react2.default.createElement(
					"p",
					null,
					"Fetching user data..."
				);
			}

			// otherwise show user profile
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"p",
					null,
					"Logged in as ",
					this.props.username
				),

				// list the administered poll
				this.props.adminPolls.map(function (poll) {
					return _react2.default.createElement(
						"div",
						{ className: "jumbotron poll-list" },
						_react2.default.createElement(
							_reactRouterDom.Link,
							{ to: "/poll?pollID=" + poll._id },
							poll.question
						),
						_react2.default.createElement(_Button2.default, {
							className: "delete-poll btn btn-danger",
							click: _this2.delete.bind(_this2),
							value: poll._id,
							label: "Delete" })
					);
				}),
				_react2.default.createElement(
					"label",
					{ htmlFor: "question" },
					"Question:\xA0"
				),
				_react2.default.createElement("input", { id: "question", type: "input" }),
				_react2.default.createElement(_Button2.default, {
					className: "btn btn-success",
					click: this.initPoll.bind(this),
					label: "Ask the masse" })
			);
		}
	}]);

	return Profile;
}(_react2.default.Component)) || _class);
exports.default = Profile;