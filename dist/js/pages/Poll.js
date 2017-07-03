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

var _queryString = require("query-string");

var _queryString2 = _interopRequireDefault(_queryString);

var _PollActions = require("../actions/PollActions");

var _Button = require("../components/Button");

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Poll = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		fetching: store.poll.fetching,
		loaded: store.poll.loaded,
		_id: store.poll.pollData._id,
		question: store.poll.pollData.question,
		opt: store.poll.pollData.opt
	};
}), _dec(_class = function (_React$Component) {
	_inherits(Poll, _React$Component);

	function Poll() {
		_classCallCheck(this, Poll);

		return _possibleConstructorReturn(this, (Poll.__proto__ || Object.getPrototypeOf(Poll)).apply(this, arguments));
	}

	_createClass(Poll, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			console.log("Fetching...");
			this.load();
		}
	}, {
		key: "vote",
		value: function vote(optID) {
			console.log("Voted", this.props.opt[optID].answer, "in", this.props._id);
			this.props.dispatch((0, _PollActions.vote)(this.props._id, optID));
		}
	}, {
		key: "load",
		value: function load() {
			// load poll	
			var pollID = _queryString2.default.parse(this.props.location.search).pollID;
			console.log("loading poll", pollID);
			this.props.dispatch((0, _PollActions.load)(pollID));
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			if (this.props.fetching == "none") {
				return _react2.default.createElement(
					"button",
					{ onClick: this.load.bind(this) },
					"Click if graph doesn't load"
				);
			}
			if (this.props.fetching == "fetching") {
				return _react2.default.createElement(
					"p",
					null,
					"Fetching polls..."
				);
			}
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"h1",
					null,
					this.props.question
				),
				_react2.default.createElement(
					"div",
					{ id: "graph" },

					// list current the count
					this.props.opt.map(function (opt) {
						return opt.count;
					})
				),
				this.props.opt.map(function (opt, optID) {
					// list the option as buttons
					return _react2.default.createElement(_Button2.default, {
						click: _this2.vote.bind(_this2),
						value: optID,
						label: opt.answer });
				})
			);
		}
	}]);

	return Poll;
}(_react2.default.Component)) || _class);
exports.default = Poll;