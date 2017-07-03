import mongo from "mongodb";

export default function loadPoll(req, res) {
	console.log("Query:", JSON.stringify(req.query));
	console.log("Loading poll", req.query.pollID);

	mongo.connect("mongodb://admin:a$ianDad@ds139942.mlab.com:39942/polling-app",
		function(err, db) {
			db.collection("polls").find({
				_id: mongo.ObjectID(req.query.pollID)
			}).toArray(function(err, docs) {
				console.log("docs:", docs);
				if(docs.length > 0) {
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
		}
	);
}