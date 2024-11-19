const userModel = require("../../models/auth/user.model");
const ErrorHandler = require("../../utils/ErrorHandler");

class AuthService {
  static register = async (userName, email, password) => {
    try {
      const existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        throw new ErrorHandler("Email already exist ", 409);
      }

      const existingUsername = await userModel.findOne({ username: userName });
      if (existingUsername) {
        throw new ErrorHandler("User name not available", 409);
      }

      console.log(userName, email, password, "i have username");

      const newUser = new userModel({
        username: userName,
        email,
        password,
      });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  static login = async (email, password) => {
    try {
      const existingUser = await userModel.findOne({ email: email });

      if (!existingUser) {
        throw new ErrorHandler("Invalid Credentials", 401);
      }

      const isPasswordMatched = await existingUser.comparePassword(password);
      if (!isPasswordMatched) {
        throw new ErrorHandler("Invalid Credentials", 401);
      }
      return existingUser;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = AuthService;
