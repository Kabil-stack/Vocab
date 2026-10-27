const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utilities/sendMail");

exports.signupUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    if (req.password === req.passwordConfirm) {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      });

      res.status(201).json({
        data: newUser,
        status: "success",
      });
      sendMail({
        to: newUser.email,
        subject: "Welcome to Vocab.",
        text: "Thank you for joining us.we hope you find our application useful😊",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "password and password confirm doesn't match",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "Success",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError(404, "cant find the user"));
    }
    if (user.lockUntil) {
      if (user.lockUntil > Date.now()) {
        return res.status(403).json({
          message: "Account is temporarily locked.Try again later",
        });
      }
      user.failedloginAttempts = 0;
      user.lockUntil = null;
      await user.save();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      user.failedloginAttempts = user.failedloginAttempts + 1;
      if (user.failedloginAttempts >= 3) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      }
      await user.save();
    }

    if (isMatch) {
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );
      user.failedloginAttempts = 0;
      user.lockUntil = null;
      await user.save();
      return res.status(200).json({
        status: "Login successfully",
        token,
        user,
      });
    } else {
      return res.status(401).json({
        status: "Invalid password or email",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user doesnt exist",
      });
    }
    const secret = process.env.JWT_SECRET + user.password;
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      secret,
      {
        expiresIn: "15m",
      },
    );
    const resetUrl = `http://localhost:5173/reset-password/${user._id}/${token}`;
    await sendMail({
      to: user.email,
      subject: "reset your password",
      text: `click this link to reset your password :${resetUrl} `,
    });
    res.status(200).json({
      message: "Reset password link sent to your mail",
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "user not exists",
      });
    }
    const secret = process.env.JWT_SECRET + user.password;
    const decoded = jwt.verify(token, secret);
    if (decoded.id !== user._id.toString()) {
      return res.status(401).json({
        message: "Invalid token!",
      });
    }

    user.password = password;
    user.failedloginAttempts = 0;
    user.lockUntil = null;
    await user.save();
    return res.status(200).json({
      message: "password reset successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const DeleteUser = await User.findOneAndDelete({ email });
    if (!DeleteUser) {
      console.log("User cannot be found");
      return next(new AppError(404, "cannot find the user"));
    }
    console.log(email);
    await sendMail({
      to: email,
      subject: "Your Account Has Been Deleted",
      text: "your account has been deleted successfully",
    });
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};
