Here’s your **updated README.md** with the correct setup based on your `package.json`:

---

# 📱 Mobile Centre (E-commerce App)

## 📖 About the Project

This project is a simple full-stack **e-commerce web application** built with Node.js and vanilla JavaScript.

It simulates an online mobile store where users can:

* Browse products by categories
* Filter and search products
* Add items to a cart
* Manage cart items
* Place orders
* Calculate installment payments (Aparik)

⚠️ **Note:** This project was created for **learning purposes** and is not intended for production use.

---

## 🚀 Features

### 🛍️ Products

* View products by category
* Dynamic filtering (price, brand, parameters)
* Product detail page

### 🛒 Cart

* Add to cart
* Update quantity
* Remove items
* Persistent cart using `localStorage`

### 💳 Installment Calculator (Aparik)

* Choose bank
* Select duration (months)
* Add down payment
* View detailed payment breakdown

### 📦 Orders

* Submit order with validation (Joi)
* Cart is cleared after order

### 🔍 Search

* Search by title, brand, or product parameters

---

## 🧱 Tech Stack

### Backend

* Node.js
* Express.js
* Joi (validation)
* File-based database (JSON)

### Frontend

* Vanilla JavaScript (ES Modules)
* EJS (templating)
* HTML / CSS

---

## 📦 Dependencies

```json
{
  "express": "~4.16.1",
  "ejs": "~2.6.1",
  "joi": "^18.1.2",
  "morgan": "~1.9.1",
  "cookie-parser": "~1.4.4",
  "http-errors": "~1.6.3",
  "debug": "~2.6.9"
}
```

### Dev Dependencies

```json
{
  "nodemon": "^3.1.14"
}
```

---

## ⚙️ Installation & Run

### 1. Clone the repository

```bash
git clone https://github.com/Avo444/mobilecentre.git
cd mobilecentre
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in development mode

```bash
npm run dev
```

Server runs on:

```
http://localhost:3000
```

---

## 📂 Project Structure

```
project/
│
├── controllers/
├── services/
├── routes/
├── middleware/
├── helper/
├── schemas/
├── db/
├── views/
├── public/
│   ├── js/
│   └── styles/
```

---

## 🔌 API Endpoints

### Products

```
GET /api/products
GET /api/products/:category
```

### Cart

```
GET    /api/cart/:id
POST   /api/cart
PATCH  /api/cart/:id
```

### Banks / Installment

```
GET  /api/bank
POST /api/bank/aparik
```

### Orders

```
POST /api/orders
```

---

## 📌 Future Improvements

* Add user authentication
* Use a real database (MongoDB)
* Add admin panel
* Improve UI/UX
* Integrate payment system

---

## 🎯 Purpose

This project was built to:

* Practice backend development with Express
* Understand frontend-backend interaction
* Learn e-commerce logic
* Improve JavaScript skills

---

## 👨‍💻 Author

Avo

---
