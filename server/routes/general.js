var router = require('express').Router();


var path = require('path');

function authRequired(req, res, next) {
	if (req.user) {
		next();
	}
	else {
		res.redirect('/login');
	}
}


router.get('/home', authRequired, function(req, res) {
	console.log('the user?', req.user);
	res.sendFile(path.join(__dirname, "../public","index.html"))
});

module.exports = router; 