var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var compression = require('compression');
var resFormater = require('./utility/resFormater.js');

app.use(cors());
app.use(resFormater);
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(compression());

app.use(require('../lib/router.js'));


app.listen(8081, function () {
   console.log("Example app listening at http://localhost:8081");
})