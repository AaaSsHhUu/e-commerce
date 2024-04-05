const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const { validateUser } = require("../middleware/validation");
const { registerUser, loginUser } = require('../controllers/user.controller');

router.route("/register").post(validateUser, asyncHandler(registerUser))
router.route("/login").post(asyncHandler(loginUser))

module.exports = router;