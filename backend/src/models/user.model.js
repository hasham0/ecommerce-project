import "dotenv/config";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const { Schema, model, models } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    minLength: [3, "please provide atleast 3 characters"],
    maxLength: [20],
    required: [true, "please provide the username"],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    minLength: [5, "please provide atleast 5 characters"],
    maxLength: [200],
    select: false,
    required: [true, "please provide the password"],
  },
  phoneNumber: {
    type: String,
    minLength: [11, "please provide atleast 11 characters"],
    required: [true, "please provide the phone number"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

// encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

// Generate Auth Token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, timestamp: Date.now() },
    process.env.JWT_SECRET_KEY || "defaultSecret",
    { expiresIn: "24h" }
  );
};

const User = models.User || model("User", userSchema);

export default User;
