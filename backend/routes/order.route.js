const express = require("express");
const router = express.Router();
const {isAuthenticated, authorizeRoles} = require("../middleware/auth");
const { newOrder, getSingleOrder, getMyOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/order.controller");


router.route("/order/new").post(isAuthenticated,newOrder);

router.route("/order/me").get(isAuthenticated, getMyOrders);

router.route("/order/:id").get(isAuthenticated, authorizeRoles("admin"), getSingleOrder);

router.route("/admin/orders").get(isAuthenticated, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id")
    .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);



module.exports = router;