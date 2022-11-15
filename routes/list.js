var express = require("express");
var router = express.Router();
var listController = require("./../controllers/list.controllers");

router.get("/", listController.listDatabases);

module.exports = router;
