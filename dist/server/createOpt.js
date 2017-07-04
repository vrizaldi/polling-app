"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createOpt;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createOpt(req, res) {
	_mongodb2.default.connect("mongodb://admin:a$ianDad@ds139942.mlab.com:39942/polling-app", function (err, db) {
		if (err) {
			console.log("unable to connect");
			res.writeHead(500);
			res.write("Unable to connect to database");
			res.end();
		} else {
			db.collection("polls").find({
				_id: _mongodb2.default.ObjectID(req.body._id)
			}).toArray(function (err, docs) {
				if (err) {
					res.writeHead(500);
					res.write("Unable to navigate through database");
					res.end();
				} else {
					console.log("docs:", docs);
					if (docs.length == 0) {
						res.writeHead(404);
						res.write("Poll not found");
						res.end();
					} else {
						// poll found
						console.log("Found it");
						db.collection("polls").findOneAndUpdate({ _id: _mongodb2.default.ObjectID(req.body._id) }, {
							$push: {
								opt: {
									answer: req.body.opt,
									count: 1
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
									opt: doc.value.opt
								});
							}
						});
					}
				}
			});
		}
	});
}