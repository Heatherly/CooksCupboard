var router = require('express').Router();


var path = require('path');


router.get('/home', function(req, res) {
	
	res.sendFile(path.join(__dirname, "../public","index.html"))
});

module.exports = router; 