const jwt = require("jsonwebtoken");
// use tolerant import for ApiResponse
const ApiResponseModule = require("../utils/apiresponseConstructor");
const ApiResponse = ApiResponseModule.default || ApiResponseModule;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json(new ApiResponse(null, "Unauthorized", false, 401));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json(new ApiResponse(null, "Token invalid", false, 403));
    }
    req.user = user;
    next();
  });
};
module.exports = verifyToken;