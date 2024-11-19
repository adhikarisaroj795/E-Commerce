const ErrorHandler = require("../../utils/ErrorHandler");
const auth_svc = require("../../service/auth/auth.service");
const sendToken = require("../../utils/jwtToken");
class UserController {
  static register = async (req, res, next) => {
    const { userName, email, password } = req.body;
    console.log(userName, email, password);
    try {
      if (
        !userName ||
        userName.trim() === "" ||
        !email ||
        email.trim() === "" ||
        !password ||
        password.trim() === ""
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
      console.log("errror caught", error);
      next(error);
    }
  };

  static login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      if (
        !email ||
        email.trim() === "" ||
        !password ||
        password.trim() === ""
      ) {
        return next(new ErrorHandler("All fields are required", 400));
      }

      const user = await auth_svc.login(email, password);
      const message = "User Logged in Success";
      sendToken(user, 200, res, message);
    } catch (error) {
      next(error);
    }
  };

  static logOut = async (req, res, next) => {
    try {
      res.status(200).clearCookie("token").json({
        status: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = UserController;

///2:08:51
