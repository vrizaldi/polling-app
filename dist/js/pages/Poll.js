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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Poll = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		fetching: store.poll.fetching,
		loaded: store.poll.loaded,
		opt: store.poll.pollData.opt
	};
}), _dec(_class = function (_React$Component) {
	_inherits(Poll, _React$Component);

	function Poll() {
		_classCallCheck(this, Poll);

		return _possibleConstructorReturn(this, (Poll.__proto__ || Object.getPrototypeOf(Poll)).apply(this, arguments));
	}

	_createClass(Poll, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			// load poll
			console.log("location", this.prop.location);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ id: "graph" },

					// list current the count
					this.props.opt.map(function (opt) {
						return opt.count;
					})
				),
				this.props.opt.map(function (opt) {
					// list the option as buttons
					return _react2.default.createElement(
						"button",
						{ onClick: this.vote.bind(this), value: opt.label },
						opt.label
					);
				})
			);
		}
	}]);

	return Poll;
}(_react2.default.Component)) || _class);
exports.default = Poll;