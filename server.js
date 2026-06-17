const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
require("dotenv").config();

// Create Express App
const app = express();

// Allow Express to read JSON request bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Import route files
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");


// Attach routes to URLs
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


// Create HTTP server
const server = http.createServer(app);

// Attach Socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Listen for client connections
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

// Start listening on a port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});