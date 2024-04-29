const express = require("express");
const router = express.Router();
const {isAuthenticated, authorizeRoles} = require("../middleware/auth");
const { newOrder, getSingleOrder, getMyOrders } = require("../controllers/order.controller");


router.route("/order/new").post(isAuthenticated,newOrder);

router.route("/order/:id").get(isAuthenticated, authorizeRoles("admin"), getSingleOrder);

router.route("/order/me").get(isAuthenticated, getMyOrders);

module.exports = router;