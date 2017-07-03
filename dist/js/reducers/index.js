"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require("redux");

var _userReducer = require("./userReducer");

var _userReducer2 = _interopRequireDefault(_userReducer);

var _pollReducer = require("./pollReducer");

var _pollReducer2 = _interopRequireDefault(_pollReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
	user: _userReducer2.default,
	poll: _pollReducer2.default
});