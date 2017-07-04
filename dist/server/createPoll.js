"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createPoll;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPoll(req, res) {
	console.log("Creating poll \"" + req.body.question + "\" \n\t\tunder the name " + req.body.username + "...");

	_mongodb2.default.connect("mongodb://admin:a$ianDad@ds139942.mlab.com:39942/polling-app", function (err, db) {
		if (err) console.log(err);

		db.collection("users").find({
			username: req.body.username

		}).toArray(function (err, docs) {
			if (err) return console.log(err);
			console.log(docs);

			if (docs.length > 0 && docs[0].password == req.body.password) {
				// authorized
				console.log("Authorisation success");
				db.collection("polls").insert({
					question: req.body.question,
					opt: []
				}, function (err, doc) {
					console.log("doc:", doc);
					if (err) {
						console.log("Insertion failed");
						console.log("Failed: 500");
						res.writeHead(500);
						res.write("Unable to create the new poll");
						res.end();
					} else {
						console.log("Insertion success");
						//		var user = docs[0];
						db.collection("users").update({ username: req.body.username }, {
							$push: {
								adminPolls: {
									_id: doc.ops[0]._id,
									question: doc.ops[0].question
								}
							}
						}, function (err) {
							if (err) {
								console.log("Insertion to user failed");
								console.log(err);
								res.writeHead(500);
								res.write("Unable to create the new poll");
								res.end();
							} else {
								console.log("Insertion to user succeed");
								res.json({
									_id: doc.ops[0]._id,
									question: doc.ops[0].question
								});
							}
						});
					}
				});
			} else {
				// unauthorised
				console.log("try password:", req.body.password);
				console.log("actual:", docs[0].password);
				console.log("Authorisation failed");
				res.writeHead(401);
				res.write("Unauthorised");
				res.end();
			}
		});

		if (err) return console.log(err);
	});
}