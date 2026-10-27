const express = require("express");
const userController = require("../controllers/userController");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const userValidator = require("../validator/userValidator");
const validate = require("../middleware/validate");

router
  .route("/")
  .post(validate(userValidator.signupSchema), userController.signupUser)
  .get(
    authMiddleware.authMiddleware,
    roleMiddleware.restrictTo("admin"),
    userController.getAllUsers,
  )
  .delete(
    authMiddleware.authMiddleware,
    roleMiddleware.restrictTo("admin"),
    userController.deleteUser,
  );

router
  .route("/login")
  .post(validate(userValidator.loginSchema), userController.loginUser);

router
  .route("/forgot-password")
  .post(
    validate(userValidator.forgotPasswordSchema),
    userController.forgotPassword,
  );
router
  .route("/reset-password/:id/:token")
  .post(
    validate(userValidator.resetPasswordSchema),
    userController.resetPassword,
  );

module.exports = router;
