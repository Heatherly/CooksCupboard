var router = require('express').Router();
var Recipe = require("../models/Recipe.js");
var User = require("../models/User.js");


var path = require('path');

function authRequired(req, res, next) {
	if (req.user) {
		next();
	}
	else {
		 res.sendStatus(403);
	}

};

router.get('/login', function(req, res) {

	res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.header("Pragma", 'no-cache');
	res.header('Expires', 0);
	
	res.sendFile(path.join(__dirname, "../public","login.html"))
});


router.post('/save', authRequired, function(req, res) {
	console.log('the user?', req.user);
	var newRecipe = new Recipe(req.body);
	console.log(req.body);
	newRecipe.save(function(err, doc) {
		if (err) {
			res.send(err);
		}
		else {
			User.findOneAndUpdate({}, { $push: { "recipes": doc._id} }, {new: true}, function(err, newdoc) {
				if (err) {
					res.send(err);
				}
				else {
					res.send(newdoc);
				}
			});
		}
	});
});

router.get("/myfaves", authRequired, function(req, res) {
	User.findOne({ username: req.user.username
	})
		
	.populate("recipes")

	.exec(function(err, doc) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(doc);
		}
	});
});

module.exports = router; 