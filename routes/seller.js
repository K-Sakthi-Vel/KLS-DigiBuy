const express = require("express");

const router = express.Router();

const Controller1 = require("../controller/index");

const Controller2 = require("../controller/seller");

router.post("/signin",Controller1.signin);

router.post("/add_product",Controller2.addProduct);

router.post("/get_products",Controller2.getProducts);

router.post("/edit_product",Controller2.editProduct);

router.post("/delete_product",Controller2.deleteProduct);

module.exports = router;
