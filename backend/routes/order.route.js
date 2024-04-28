const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middleware/auth");
const { newOrder } = require("../controllers/order.controller");


router.route("/order/new").post(isAuthenticated,newOrder);

module.exports = router;