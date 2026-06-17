🛒 E-Commerce REST API
📌 Overview

This project is a RESTful E-Commerce Backend API built using Node.js, Express, and PostgreSQL.

It provides secure authentication, role-based access control, product management, cart functionality, and order processing. The system follows clean architecture principles and REST API best practices.

The goal of this project was to design and implement a secure, scalable, and maintainable backend system.

🛠️ Tech Stack

Node.js

Express.js

PostgreSQL

JWT (JSON Web Token)

bcrypt

dotenv

🔐 Authentication & Authorization

User Registration & Login

Password hashing using bcrypt

JWT-based authentication

Protected route middleware

Role-Based Access Control (Admin / User)

✨ Core Features
👤 User Management

Register new user

Login and receive JWT token

Secure password storage

Role-based permissions

📦 Product Management

Create product (Admin only)

Update product (Admin only)

Delete product (Admin only)

Get all products

Get single product

Stock tracking and validation

🛒 Cart System

Add product to cart

Remove product from cart

Update product quantity

Calculate total cart value

📑 Order System

Create order from cart

Prevent ordering out-of-stock products

Automatically reduce stock after successful order

View user order history

🗂️ Project Structure
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── config/
 └── server.js

The project is structured in a modular way to ensure scalability, readability, and maintainability.

📡 API Endpoints
🔑 Auth

POST /api/auth/register

POST /api/auth/login

📦 Products

GET /api/products

GET /api/products/:id

POST /api/products (Admin only)

PUT /api/products/:id (Admin only)

DELETE /api/products/:id (Admin only)

🛒 Cart

POST /api/cart

GET /api/cart

DELETE /api/cart/:productId

📑 Orders

POST /api/orders

GET /api/orders

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/diargllareva/E-commerce-Backend-REST-API.git
cd E-commerce-Backend-REST-API
2️⃣ Install Dependencies
npm install
3️⃣ Create .env File

Create a .env file in the root directory:

PORT=5000
POSTGRES_URI=your_postgres_connection_string
JWT_SECRET=your_secret_key
4️⃣ Run the Server
npm run dev

Server runs at:

http://localhost:5000
🧠 Key Learnings

Designing RESTful APIs

Implementing secure authentication systems

Handling role-based authorization

Managing business logic (cart → order → stock updates)

Structuring scalable backend applications

Working with PostgreSQL

🚀 Future Improvements

Implement refresh token authentication

Add API documentation using Swagger

Add unit and integration tests (Jest)

Integrate payment gateway

Dockerize the application

👩‍💻 Author

Tanya Srivastava
Backend Developer – Node.js | Express | PostgreSQL
