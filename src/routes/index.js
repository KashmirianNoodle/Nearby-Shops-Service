const express = require("express");
const router = express.Router();
const { checkLocation } = require("../middlewares/search.middleware");
const searchRoutes = require("./search.route");

router.use("/search", checkLocation, searchRoutes);

module.exports = router;
