const express = require("express");
const router = express.Router();
const auth_ctrl = require("../controllers/auth.controller");

router.route("/register").post(auth_ctrl.register);
router.route("/login").post(auth_ctrl.login);

module.exports = router;
