const express = require("express");
const router = express.Router();
const controller = require("../controllers/search");

router.route("/pizza").get(controller.searchPizza);

router.route("/juice").get(controller.searchJuice);

router.route("/combo").get(controller.searchCombo);

module.exports = router;
