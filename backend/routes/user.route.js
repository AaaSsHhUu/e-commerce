const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const { validateUser } = require("../middleware/validation");
const { registerUser, loginUser, logoutUser, resetPassword, forgotPassword, getUserDetails, updateUserPassword, updateUserProfile } = require('../controllers/user.controller');
const { isAuthenticated } = require("../middleware/auth");

router.route("/register").post(validateUser, asyncHandler(registerUser));

router.route("/login").post(asyncHandler(loginUser));

router.route("/password/forgot").post(asyncHandler(forgotPassword))

router.route("/password/reset/:token").put(asyncHandler(resetPassword))

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticated,asyncHandler(getUserDetails))

router.route("/password/update").put(isAuthenticated, asyncHandler(updateUserPassword))

router.route("/me/update").put(isAuthenticated, asyncHandler(updateUserProfile))



module.exports = router;