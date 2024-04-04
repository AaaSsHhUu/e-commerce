const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const { validateUser } = require("../middleware/validation");
const {registerUser} = require('../controllers/user.controller');

router.route("/register").post(validateUser,asyncHandler(registerUser))

module.exports = router;