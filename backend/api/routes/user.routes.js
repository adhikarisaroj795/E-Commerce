const express = require("express");
const router = express.Router();
const usr_ctrl = require("../controllers/user.controller");

router.route("/").get(usr_ctrl.login);

module.exports = router;
