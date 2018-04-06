var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/submitdata', function (req, res, next) {
	fs.readFile(__dirname+ '/markdown/test.md', 'utf8', function (err, data) {
	  if (err) {
	  	res.formateReply('InternalServerError');
	  }
	  else{
	  	obj = data;
	  	console.log('[data]',data);
	  	res.send(obj);
	  }
	  next();
	});
})

module.exports = router;