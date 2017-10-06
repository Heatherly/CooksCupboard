var router = require('express').Router();
var User = require('../models/User.js');
var path = require('path');
var passport = require('passport');


router.get('/login', function(req, res) {
	
	res.sendFile(path.join(__dirname, "../public","login.html"))
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/home',
	failureRedirect: '/login'
}));

router.get('/register', function(req, res) {
	
	res.sendFile(path.join(__dirname, "../public","register.html"))
});

router.post('/register', function(req, res, next) {

	console.log("body", req.body);

	var user = new User({
		username: req.body.username,
		password: req.body.password
	});
	user.save(function(err) {
		if (err) {
			console.log('error with saving user', err);
		}
		next();
		
	});
}, passport.authenticate('local', {
	successRedirect: '/home',
}));

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/home');
});

module.exports = router; 
