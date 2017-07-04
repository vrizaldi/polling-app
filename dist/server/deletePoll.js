"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = deletePoll;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deletePoll(req, res) {
	_mongodb2.default.connect("mongodb://admin:a$ianDad@ds139942.mlab.com:39942/polling-app", function (err, db) {
		db.collection("users").find({
			username: req.body.username,
			password: req.body.password
		}).toArray(function (err, docs) {
			console.log("docs:", docs);
			var user = docs[0];
			if (docs < 1) {
				// user not found
				res.writeHead(401);
				res.write("Unauthorized");
				res.end();
			} else if (contains(user.adminPolls, req.body._id)) {
				// delete the poll from both user and polls collection
				console.log("user authorised");
				db.collection("polls").findOneAndDelete({
					_id: _mongodb2.default.ObjectID(req.body._id)
				}, function (err, docs) {
					console.log("docs delete", docs);
					db.collection("users").findOneAndUpdate({
						username: req.body.username
					}, {
						$pull: {
							adminPolls: {
								_id: _mongodb2.default.ObjectID(req.body._id)
							}
						}
					}, { returnOriginal: false }, function (err, doc) {
						console.log("doc:", doc);
						if (err) {
							console.log("insertion failed");
							res.writeHead(500);
							res.write("Unable to update the database");
							res.end();
						} else {
							console.log("success");
							res.json({
								adminPolls: doc.value.adminPolls
							});
						}
					});
				});
			}
		});
	});
}

function contains(polls, id) {
	for (var i = 0; i < polls.length; i++) {
		if (polls[i]._id == id) {
			return true;
		}
	}
	return false;
}