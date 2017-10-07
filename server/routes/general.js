var router = require('express').Router();
var Recipe = require("../models/Recipe.js");
var User = require("../models/User.js");


var path = require('path');

function authRequired(req, res, next) {
	if (req.user) {
		next();
	}
	else {
		res.redirect('/login');
	}
}


router.get('/home', function(req, res) {
	console.log('the user?', req.user);
	res.sendFile(path.join(__dirname, "../public","index.html"))
});

router.post('/save', function(req, res) {
	var newRecipe = new Recipe(req.body);

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

router.get("/myfaves", function(req, res) {
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