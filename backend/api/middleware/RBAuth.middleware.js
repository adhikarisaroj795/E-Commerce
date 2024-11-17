const ErrorHandler = require("../utils/ErrorHandler");

const jwt = require("jsonwebtoken");

class AuthRBAMiddleware {
  static verifyToken = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return next(new ErrorHandler("User not authenticated", 401));
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error(err);
          return next(new ErrorHandler("Token is not valid", 403));
        }
        req.user = decoded;
        next();
      });
    } catch (error) {
      return next(
        new ErrorHandler(
          error.message || "TOken is not valid",
          error.status || 403
        )
      );
    }
  };

  static shouldBeLoggedIn = (req, res, next) => {
    AuthRBAMiddleware.verifyToken(req, res, (err) => {
      if (err) return next(err);
      next();
    });
  };

  static shouldBeAdmin = (req, res, next) => {
    AuthRBAMiddleware.verifyToken(req, res, (err) => {
      if (err) return next(err);

      if (req.user.role === "user") {
        return next(new ErrorHandler("You are not admin", 403));
      }
      next();
    });
  };
}

module.exports = AuthRBAMiddleware;
