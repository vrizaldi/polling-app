import mongo from "mongodb";

export default function handleSignup(req, res) {
	console.log("Signing up...");
	console.log("Username:", req.body.username);
	console.log("password:", req.body.password);

	mongo.connect("mongodb://admin:a$ianDad@ds139942.mlab.com:39942/polling-app", function (err, db) {
		db.collection("users").find({
			username: req.body.username
		}).toArray(function (err, docs) {
			console.log(docs);
			if (docs.length == 0) {
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
					success: false
				});
			}
		}); // to array
	}); // mongo connect	
}