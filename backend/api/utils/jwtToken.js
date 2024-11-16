const sendToken = async (user, statusCode, res, message) => {
  const token = user.getJwtToken();
  const age = 1000 * 60 * 60 * 24 * 7;

  const options = {
    httpOnly: true,
    maxAge: age,
    // secure: true
  };

  const { password, ...rest } = await user._doc;
  res.status(statusCode).cookie("token", token, options).json({
    status: true,
    token,
    user: rest,
    msg: message,
  });
};

module.exports = sendToken;
