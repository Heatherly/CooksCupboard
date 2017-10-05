var router = require('express').Router();


router.get('/', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")

});

module.exports = router; 