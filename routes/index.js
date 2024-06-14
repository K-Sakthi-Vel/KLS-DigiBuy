const express = require("express");

const router = express();

const Controller = require("../controller/index");

router.get("/",Controller.home);

router.use("/user",require("./user"));

router.use("/seller",require("./seller"));

module.exports = router;