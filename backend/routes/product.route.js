const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail } = require("../controllers/product.controller");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const { validateProduct } = require("../middleware/validation");
const isAuthenticated = require("../middleware/auth");


router.route("/products").get(asyncHandler(getAllProducts))

router.route("/product/new").post(isAuthenticated, validateProduct, asyncHandler(createProduct))

router.route("/product/:id")
    .get(asyncHandler(getProductDetail))
    .put(asyncHandler(isAuthenticated, updateProduct))
    .delete(asyncHandler(isAuthenticated, deleteProduct))

module.exports = router;