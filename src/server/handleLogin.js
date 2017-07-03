import mongo from "mongodb";

export default function handleLogin(req, res) {
	console.log("Logging in...");
	console.log("Username:", req.body.username);
	console.log("password:", req.body.password);

	mongo.connect("mongodb://admin:a$ianDad@ds139942.mlab.com:39942/polling-app", function (err, db) {
		db.collection("users").find({
			username: req.body.username
		}).toArray(function (err, docs) {
			console.log(docs);
			if (docs.length > 0 && req.body.password == docs[0].password) {
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
					success: false
				});
			}
		}); // to array
	}); // mongo connect	
}