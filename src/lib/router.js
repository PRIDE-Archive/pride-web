var express = require('express');
var router = express.Router();
var EditPageController = require("./EditPageController.js");

router.use("/api/editpage",EditPageController);

module.exports = router;