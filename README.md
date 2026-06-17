# 🛒 E-Commerce Backend REST API

> A secure and scalable backend system for an e-commerce platform built with **Node.js, Express.js, PostgreSQL, JWT, and bcrypt**.

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration & Login
* Password Hashing with bcrypt
* JWT Authentication
* Protected Routes
* Role-Based Access Control (Admin/User)

### 📦 Product Management

* Create Products (Admin)
* Update Products (Admin)
* Delete Products (Admin)
* View Products
* Product Inventory Tracking

### 🛒 Cart Management

* Add Products to Cart
* Update Quantity
* Remove Products
* Calculate Cart Total

### 📑 Order Processing

* Create Orders
* Stock Validation
* Automatic Inventory Updates
* Order History Tracking

---

## 🏗️ Architecture

```text
Client
   │
   ▼
Express API
   │
   ├── Authentication Layer
   ├── Product Module
   ├── Cart Module
   ├── Order Module
   │
   ▼
PostgreSQL Database
```

---

## 🛠️ Tech Stack

| Category       | Technologies        |
| -------------- | ------------------- |
| Backend        | Node.js, Express.js |
| Database       | PostgreSQL          |
| Authentication | JWT, bcrypt         |
| Environment    | dotenv              |
| API Testing    | Postman             |

---

## 📂 Project Structure

```text
src/
├── controllers/
├── routes/
├── middlewares/
├── services/
├── config/
├── utils/
└── server.js
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

### Products

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /api/products     |
| GET    | /api/products/:id |
| POST   | /api/products     |
| PUT    | /api/products/:id |
| DELETE | /api/products/:id |

### Cart

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | /api/cart            |
| GET    | /api/cart            |
| PUT    | /api/cart/:productId |
| DELETE | /api/cart/:productId |

### Orders

| Method | Endpoint    |
| ------ | ----------- |
| POST   | /api/orders |
| GET    | /api/orders |

---

## ⚙️ Getting Started

### Clone Repository

```bash
git clone https://github.com/thetanyasrivastava/E-commerce-Backend-REST-API.git
cd E-commerce-Backend-REST-API
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
POSTGRES_URI=your_connection_string
JWT_SECRET=your_secret_key
```

### Run Server

```bash
npm run dev
```

---

## 🎯 Key Highlights

✅ Secure JWT Authentication

✅ Role-Based Authorization

✅ PostgreSQL Integration

✅ Inventory Management

✅ Modular Backend Architecture

✅ RESTful API Design

---

## 🚀 Future Improvements

* Refresh Token Authentication
* Swagger Documentation
* Docker Support
* Jest Testing
* Payment Gateway Integration
* CI/CD Pipeline

---

## 👩‍💻 Author

**Tanya Srivastava**

Backend Developer | Node.js | Express.js | PostgreSQL
