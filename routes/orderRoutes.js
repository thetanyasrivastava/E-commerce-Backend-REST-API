const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createOrderFromCart,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// User routes
router.post("/", authMiddleware, createOrderFromCart);
router.get("/my", authMiddleware, getMyOrders);

// Admin routes
router.get("/", authMiddleware, adminMiddleware, getAllOrders);
router.patch("/:orderId/status", authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;