var express = require('express');
var router = express.Router();
var EditPageController = require("./EditPageController.js");
var MarkdownController = require("./MarkdownController.js");
var DynatraceController = require("./DynatraceController.js");

router.use("/api/editpage",EditPageController);
router.use("/api/markdownquery",MarkdownController);
router.use("/api/dynatrace",DynatraceController);


module.exports = router;
