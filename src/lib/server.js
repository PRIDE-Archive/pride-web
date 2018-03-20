var express = require('express');
var app = express();


//app.use(require('../lib/router.js'));
app.use('/api/test', function (req, res, next) {

   console.log('123',req);
   res.send(123);
})

app.listen(8081, function () {
   console.log("Example app listening at http://localhost:8081");
})