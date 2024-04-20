const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail, createProductReview } = require("../controllers/product.controller");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const { validateProduct } = require("../middleware/validation");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");


router.route("/products").get(asyncHandler(getAllProducts))

router.route("/admin/product/new").post(isAuthenticated, authorizeRoles("admin"), validateProduct, asyncHandler(createProduct))

router.route("/product/:id").get(asyncHandler(getProductDetail))

router.route("/admin/product/:id")
    .put(asyncHandler(isAuthenticated, authorizeRoles("admin"), updateProduct))
    .delete(asyncHandler(isAuthenticated, authorizeRoles("admin"), deleteProduct))

router.route("/review").put(isAuthenticated, asyncHandler(createProductReview));

module.exports = router;