const ErrorHandler = require("../utils/ErrorHandler");
const auth_svc = require("../service/auth.service");
const sendToken = require("../utils/jwtToken");
class UserController {
  static register = async (req, res, next) => {
    const { userName, email, password } = req.body;
    try {
      if (
        !userName ||
        userName === "" ||
        !email ||
        email === "" ||
        !password ||
        password === ""
      ) {
        return next(new ErrorHandler("All fields are required", 400));
      }

      const newUser = await auth_svc.register(userName, email, password);

      res.status(200).json({
        status: true,
        user: newUser,
        msg: "User created success",
      });
    } catch (error) {
      next(error);
    }
  };

  static login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      if (!email || email === "" || !password || password === "") {
        return next(new ErrorHandler("All fields are required", 400));
      }

      const user = await auth_svc.login(email, password);
      const message = "User Logged in Success";
      sendToken(user, 200, res, message);
    } catch (error) {
      next(error);
    }
  };
}
module.exports = UserController;
