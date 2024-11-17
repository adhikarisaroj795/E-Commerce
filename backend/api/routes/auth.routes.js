const express = require("express");
const router = express.Router();
const auth_ctrl = require("../controllers/auth.controller");
const AuthRBAMiddleware = require("../middleware/RBAuth.middleware");

router.route("/register").post(auth_ctrl.register);
router.route("/login").post(auth_ctrl.login);
router.route("/logout").post(auth_ctrl.logOut);
router.route("/logout").post(auth_ctrl.logOut);
router.route("/check-auth").get(AuthRBAMiddleware.verifyToken, (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: true,
    message: "Authenticated user",
    user,
  });
});

module.exports = router;

// 2: 45: 47
