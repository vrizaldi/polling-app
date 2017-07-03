"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = loadPoll;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadPoll(req, res) {
	console.log("Query:", JSON.stringify(req.query));
	console.log("Loading poll", req.query.pollID);

	_mongodb2.default.connect("mongodb://admin:a$ianDad@ds139942.mlab.com:39942/polling-app", function (err, db) {
		db.collection("polls").find({
			_id: _mongodb2.default.ObjectID(req.query.pollID)
		}).toArray(function (err, docs) {
			console.log("docs:", docs);
			if (docs.length > 0) {
				// found the poll
				var poll = docs[0];
				res.json({
					_id: poll._id,
					question: poll.question,
					opt: poll.opt
				});
			} else {
				// poll not found
				res.writeHead(404);
				res.write("Poll not found");
				res.end();
			}
		});
	});
}