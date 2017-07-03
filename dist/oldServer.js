const express = require("express");
const mongo = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

var server = express();

server.use(express.static(__dirname + "/public"));
var jsonencoded = bodyParser.json();

server.get("/", 
	function(req, res) {
		console.log("Called");
		res.sendFile(__dirname + "/views/index.html",
			function(err) {
				if(err) throw err;

				console.log("File sent\n");
			});
	});

server.post("/login", jsonencoded,
	function(req, res) {
		console.log("Logging in...");
		console.log("Username:", req.body.username);
		console.log("password:", req.body.password);

		mongo.connect(
			"mongodb://admin:a$ianDad@ds139942.mlab.com:39942/polling-app",
			function(err, db) {
				db.collection("users").find({
					username: req.body.username
				}).toArray(function(err, docs) {
					console.log(docs);
					if(docs.length > 0 
							&& req.body.password == docs[0].password) {
						// username found and password match
						console.log("success");
						res.json({
							username: req.body.username,
							bio: "It's the " + req.body.username
						});
					} else {
						// username and password didn't match
						console.log("failed");
						res.json({
							success : false
						});
					}
				}); // to array
			});	// mongo connect	
	});	// server post

server.post("/register", jsonencoded,
	function(req, res) {
		console.log("Signing up...");
		console.log("Username:", req.body.username);
		console.log("password:", req.body.password);

		mongo.connect(
			"mongodb://admin:a$ianDad@ds139942.mlab.com:39942/polling-app",
			function(err, db) {
				db.collection("users").find({
					username: req.body.username
				}).toArray(function(err, docs) {
					console.log(docs);
					if(docs.length == 0) {
						// username isn't used
						console.log("success");

						// save to database
						db.collection("users").save({
							username: req.body.username,
							password: req.body.password
						});

						res.json({
							success: true
						});
					} else {
						console.log("failed");
						res.json({
							success : false
						});
					}
				}); // to array
			});	// mongo connect	
		
		
	})

var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, 
	function(err) {
		if(err) throw err;

		console.log("Server is listening on port " + port);
});