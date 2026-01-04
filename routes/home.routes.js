const express = require("express");
const { default: ApiResponse } = require("../utils/apiresponseConstructor");
const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.json(new ApiResponse(null, "Welcome to the Personal Backend API", true, 200));
});

module.exports = router;
