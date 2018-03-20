var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/get', function (req, res, next) {
	fs.readFile(__dirname+ '/db/landing_page.json', 'utf8', function (err, data) {
	  if (err) {
	  	console.log('[err]',err);
	  	res.formateReply('InternalServerError');
	  }
	  else{
	  	obj = JSON.parse(data);
	  	res.formateReply('OK', obj);
	  }
	  next();
	});
})

module.exports = router;