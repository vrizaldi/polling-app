"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = handleVote;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleVote(req, res) {
	console.log("Voting for", req.body.optID);
	_mongodb2.default.connect("mongodb://admin:a$ianDad@ds139942.mlab.com:39942/polling-app", function (err, db) {
		if (err) return console.log(err);

		console.log(JSON.stringify(req.body));
		db.collection("polls").find({
			_id: _mongodb2.default.ObjectID(req.body._id)
		}).toArray(function (err, docs) {
			console.log("docs", docs);
			if (docs.length > 0) {
				// docs found
				var poll = docs[0];
				if (docs.length < 1) {
					res.writeHead(404);
					res.write("Poll not found");
					res.end();
				} else if (poll.opt.length <= req.body.optID) {
					// option not found
					res.writeHead(404);
					res.write("Option not found");
					res.end();
				} else {
					// option found
					var nOpt = poll.opt.splice(0);
					++nOpt[req.body.optID].count;
					// increase the count for the option
					var _id = poll._id,
					    question = poll.question;

					db.collection("polls").save({
						// update the poll count
						_id: _id,
						question: question,
						opt: nOpt
					});

					res.json({
						_id: _id,
						question: question,
						opt: nOpt
					});
				}
			}
		});
	});
}