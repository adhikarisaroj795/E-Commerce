const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Schema for user data
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"], // Added custom validation message
      unique: true,
      trim: true, // Trim the value to remove leading/trailing spaces
      minlength: [3, "Username must be at least 3 characters"], // Added length constraint
      maxlength: [20, "Username can't be longer than 20 characters"], // Optional: You can set max length if needed
    },
    email: {
      type: String,
      required: [true, "Email is required"], // Custom validation message
      unique: true,
      lowercase: true, // Ensures email is stored in lowercase
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // Email format validation
    },
    password: {
      type: String,
      required: [true, "Password is required"], // Custom validation message
      minlength: [6, "Password must be at least 6 characters"], // Password length check
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Allows only 'user' or 'admin' roles
      default: "user",
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Passing the error to the next middleware or error handler
  }
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Method to generate a JWT token
userSchema.methods.getJwtToken = function () {
  const age = 1000 * 60 * 60 * 24 * 7; // Token expiration time (1 week)
  return jwt.sign(
    {
      username: this.username,
      id: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET, // Your JWT secret from .env
    { expiresIn: age }
  );
};

// Create the User model using the schema
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
