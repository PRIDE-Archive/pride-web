var express = require('express');
var router = express.Router();
var EditPageController = require("./EditPageController.js");
var MarkdownController = require("./MarkdownController.js");

router.use("/api/editpage",EditPageController);
router.use("/api/markdownquery",MarkdownController);

module.exports = router;
