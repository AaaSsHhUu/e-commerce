const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail, createProductReview, getProductReviews } = require("../controllers/product.controller");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const { validateProduct } = require("../middleware/validation");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");


router.route("/products").get(asyncHandler(getAllProducts))

router.route("/admin/product/new").post(isAuthenticated, authorizeRoles("admin"), validateProduct, asyncHandler(createProduct))

router.route("/product/:id").get(asyncHandler(getProductDetail))

router.route("/admin/product/:id")
    .put(isAuthenticated, authorizeRoles("admin"), asyncHandler(updateProduct))
    .delete(isAuthenticated, authorizeRoles("admin"), asyncHandler(deleteProduct))

router.route("/review").put(isAuthenticated, asyncHandler(createProductReview));
router.route("/reviews").get(getProductReviews)
module.exports = router;