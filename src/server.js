import express from "express";
import bodyParser from "body-parser";
import reactDOMServer from "react-dom/server";
import React from "react";

import handleLogin from "./server/handleLogin";
import handleSignup from "./server/handleSignup";
import Client from "./server/Client";

var server = express();

server.use(express.static(__dirname + "/public"));
var jsonencoded = bodyParser.json();

server.get("*", serveIndex);

function serveIndex(req, res) {
	console.log("Called");

	const context = {};
	var url = req.url == "/" ? "/login" : req.url;
		// redirect to login by default
	const html = reactDOMServer.renderToString(
		<Client
			location={url}
			context={context}/>);

	console.log("sending file...");
	res.writeHead(200, {
		"content-type": "text/html"
	});
	res.write(`
		<!doctype html>
		<html>
		<head>
			<meta charset="utf-8">

			<title></title>
			<meta name="author" content="vrizaldi">

			<link href="/index.min.css" rel="stylesheet">
		<!--	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
			rel="stylesheet" >-->
		</head>

		<body>
			<h1>Test</h1>
			<div id="app">${html}</div>
			<script src="/client.min.js"></script>
			<p id="credit">Verdy Noorghifari 2017 © All right reversed.</p>
		</body>
		</html>
	`);
	res.end();
	console.log("file sent:", html);
	
	/*
	res.sendFile(__dirname + "/views/index.html", function (err) {
		if (err) throw err;

		console.log("File sent\n");
	});
	*/
}

server.post("/login", jsonencoded, handleLogin); // server post

server.post("/register", jsonencoded, handleSignup); // server post

var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, function (err) {
	if (err) throw err;

	console.log("Server is listening on port " + port);
});
