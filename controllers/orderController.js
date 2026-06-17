const { Order } = require("../models/Order");
const { Cart } = require("../models/Cart");
const { Product } = require("../models/Product");


async function createOrderFromCart(req, res) {
  try {
    const userId = req.user.id;

    // 1. Find user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        message: "Nothing to order",
      });
    }

    // 2. STOCK CHECK + REDUCTION
    for (const item of cart.items) {
    if (!item.product) {
        return res.status(400).json({
        message: "One or more products in your cart no longer exist",
        });
    }

    const product = await Product.findById(item.product._id);

    if (product.stock < item.quantity) {
        return res.status(400).json({
        message: `Not enough stock for ${product.name}`,
        });
    }

    product.stock -= item.quantity;
    await product.save();
    }

    // 3. Copy cart items into order items
    const orderItems = cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        }));

    // 4. Calculate totals
    const totalItems = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // 5. Create order
    const order = new Order({
      user: userId,
      items: orderItems,
      totalItems,
      totalPrice,
      status: "pending",
    });

    await order.save();

    // 6. Clear cart
    cart.items = [];
    await cart.save();

    // 7. Respond
    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}


async function getMyOrders(req, res) {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).populate(
      "items.product"
    );

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product");

    const shapedOrders = orders.map((order) => ({
      orderId: order.id,
      user: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
      },
      status: order.status,
      createdAt: order.createdAt,
      totalItems: order.totalItems,
      totalPrice: order.totalPrice,
      items: order.items.map((item) => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
        },
        quantity: item.quantity,
      })),
    }));

    res.status(200).json({
      orders: shapedOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Allowed statuses
    const allowedStatuses = ["pending", "shipped", "delivered"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    // Find order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Update status
    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  createOrderFromCart,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
