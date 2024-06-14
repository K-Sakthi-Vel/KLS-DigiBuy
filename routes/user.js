const express = require("express");

const router = express.Router();

const Controller1 = require("../controller/index");

const Controller2 = require("../controller/user");

router.post("/register",Controller1.register);

router.post("/signin",Controller1.signin);

router.post("/get_products",Controller2.getProducts);

router.post("/search_products",Controller2.searchProducts);

module.exports = router;