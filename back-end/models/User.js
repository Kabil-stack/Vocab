const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: [true, "must give your name"],
    },
    email: {
      type: String,
      required: [true, "must give your email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "must tell us your password"],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,

      minlength: 8,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password does not match",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    failedloginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
