var router = require('express').Router();

var path = require('path');


router.get('/login', function(req, res) {
	
	res.sendfile(path.join(__dirname, "../public","login.html"))
});

module.exports = router; 
