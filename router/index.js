"use strict";
exports.__esModule = true;
var express = require("express");
var router = express.Router();
router.get("/", function (req, res, next) {
    res.send("사용자 정보 페이지!!!");
});
exports["default"] = router;
