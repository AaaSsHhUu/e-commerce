const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail } = require("../controllers/product.controller");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const { validateProduct } = require("../middleware/validation");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");


router.route("/products").get(asyncHandler(getAllProducts))

router.route("/product/new").post(isAuthenticated, authorizeRoles("admin"), validateProduct, asyncHandler(createProduct))

router.route("/product/:id")
    .get(asyncHandler(getProductDetail))
    .put(asyncHandler(isAuthenticated, authorizeRoles("admin"), updateProduct))
    .delete(asyncHandler(isAuthenticated, authorizeRoles("admin"), deleteProduct))

module.exports = router;