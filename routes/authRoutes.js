const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { registerUser, loginUser } = require("../controllers/authController");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user,                                   // why in authRoutes we need this and not in productRoutes
  });
});


module.exports = router;