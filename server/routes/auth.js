var router = require('express').Router();
var User = require('./models/user');
var path = require('path');


router.get('/login', function(req, res) {
	
	res.sendfile(path.join(__dirname, "../public","login.html"))
});

router.get('/login', function(req, res) {
	
	res.sendfile(path.join(__dirname, "../public","register.html"))
});

router.post('/register', function(req, res) {

	console.log("body", req.body);

	var user = new User({
		username: req.body.userEmail,
		password: req.body.password
	});
	user.save(function(err) {
		if (err) {
			console.log('error with saving user', err);
		}

		res.redirect('/')
	});


	res.redirect('/register');
});

module.exports = router; 
