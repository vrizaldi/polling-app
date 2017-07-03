"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _handleLogin = require("./server/handleLogin");

var _handleLogin2 = _interopRequireDefault(_handleLogin);

var _handleSignup = require("./server/handleSignup");

var _handleSignup2 = _interopRequireDefault(_handleSignup);

var _Client = require("./server/Client");

var _Client2 = _interopRequireDefault(_Client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

server.use(_express2.default.static(__dirname + "/public"));
var jsonencoded = _bodyParser2.default.json();

server.get("*", serveIndex);

function serveIndex(req, res) {
	console.log("Called");

	var context = {};
	var url = req.url == "/" ? "/login" : req.url;
	// redirect to login by default
	var html = _server2.default.renderToString(_react2.default.createElement(_Client2.default, {
		location: url,
		context: context }));

	console.log("sending file...");
	res.writeHead(200, {
		"content-type": "text/html"
	});
	res.write("\n\t\t<!doctype html>\n\t\t<html>\n\t\t<head>\n\t\t\t<meta charset=\"utf-8\">\n\n\t\t\t<title></title>\n\t\t\t<meta name=\"author\" content=\"vrizaldi\">\n\n\t\t\t<link href=\"/index.min.css\" rel=\"stylesheet\">\n\t\t<!--\t<link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" \n\t\t\trel=\"stylesheet\" >-->\n\t\t</head>\n\n\t\t<body>\n\t\t\t<h1>Test</h1>\n\t\t\t<div id=\"app\">" + html + "</div>\n\t\t\t<script src=\"/client.min.js\"></script>\n\t\t\t<p id=\"credit\">Verdy Noorghifari 2017 \xA9 All right reversed.</p>\n\t\t</body>\n\t\t</html>\n\t");
	res.end();
	console.log("file sent:", html);

	/*
 res.sendFile(__dirname + "/views/index.html", function (err) {
 	if (err) throw err;
 		console.log("File sent\n");
 });
 */
}

server.post("/login", jsonencoded, _handleLogin2.default); // server post

server.post("/register", jsonencoded, _handleSignup2.default); // server post

var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, function (err) {
	if (err) throw err;

	console.log("Server is listening on port " + port);
});
