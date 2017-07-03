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

var _Form = require("../components/Form");

var _Form2 = _interopRequireDefault(_Form);

var _Notif = require("../components/Notif");

var _Notif2 = _interopRequireDefault(_Notif);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Register = (_dec = (0, _reactRedux.connect)(function (store) {
	// allow dispatch
	return {
		fetching: store.user.fetching
	};
}), _dec(_class = function (_React$Component) {
	_inherits(Register, _React$Component);

	function Register() {
		_classCallCheck(this, Register);

		var _this = _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).call(this));

		_this.insufficient = false;
		return _this;
	}

	_createClass(Register, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			this.props.dispatch((0, _UserActions.reset)());
		}
	}, {
		key: "render",
		value: function render() {
			var notification = "";
			if (this.props.fetching == "fetching") return _react2.default.createElement(
				"p",
				null,
				"Registering user..."
			);else if (this.props.fetching == "failed") notification = "Register failed, username is used";else if (this.props.fetching == "success") notification = "Register success";

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_Notif2.default, { text: notification }),
				_react2.default.createElement(_Form2.default, { action: this.register.bind(this), label: "Register" }),
				_react2.default.createElement(
					"p",
					null,
					"Or click ",
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ to: "/login" },
						"here"
					),
					" to login"
				)
			);
		}
	}, {
		key: "register",
		value: function register() {
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;
			this.props.dispatch((0, _UserActions.register)(username, password));
		}
	}]);

	return Register;
}(_react2.default.Component)) || _class);
exports.default = Register;