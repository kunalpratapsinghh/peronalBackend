const express = require("express");
const jwt = require("jsonwebtoken");
const ApiResponseModule = require("../utils/apiresponseConstructor");
const ApiResponse = ApiResponseModule.default || ApiResponseModule;
const verifyToken = require("../middleware/verifytoken");
const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.json(new ApiResponse(null, "Welcome to the Personal Backend API", true, 200));
});


router.post("/login", (req, res) => {
  const { userName, password } = req.body;
  if (userName === process.env.USER_NAME && password === process.env.USER_PASSWORD) {
    const token = jwt.sign({ userName }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json(new ApiResponse(token, "Login successful", true, 200));
  } else {
    res.status(401).json(new ApiResponse(null, "Invalid credentials", false, 401));
  }
});


router.get("/verify-token", verifyToken, (req, res) => {
  res.json(new ApiResponse(null, "Token is valid", true, 200));
});



module.exports = router;
