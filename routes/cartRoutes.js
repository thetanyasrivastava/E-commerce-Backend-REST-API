const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { addProductToCart, getMyCart, decreaseCartItem, removeProductFromCart,clearCart } = require("../controllers/cartController");

router.post( "/add", authMiddleware, addProductToCart );
router.get( "/", authMiddleware, getMyCart );
router.patch( "/",authMiddleware, decreaseCartItem )
router.delete( "/remove/:productId", authMiddleware, removeProductFromCart );
router.delete( "/clear", authMiddleware, clearCart );

module.exports = router;