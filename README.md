# 📚 Library Management API

## 🎯 Objective

This project implements a **Library Management System** using **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

It allows managing books, borrowing books with proper business logic, and generating borrowed books summaries using aggregation.

---

## 🔧 Features

- Create, read, update, and delete books
- Borrow books with automatic copies management
- Check availability before borrowing
- Aggregated summary of borrowed books
- Schema validation with Mongoose
- Static & instance methods for business logic
- Pre-save middleware for borrow operations
- Filtering, sorting, and pagination for books
- Consistent structured error responses

---

## 🛠 Technology Stack

- **Node.js & Express** – Backend server
- **TypeScript** – Strong typing
- **MongoDB & Mongoose** – Database and ODM
- **Postman / Swagger** – API testing
- **Nodemon** – Development live reload

---

## 📦 Models & Validation

### Book Model

- `title` (string) — Mandatory.
- `author` (string) — Mandatory.
- `genre` (string) — Mandatory. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
- `isbn` (string) — Mandatory and unique.
- `description` (string) — Optional.
- `copies` (number) — Mandatory, non-negative integer.
- `available` (boolean) — Defaults to true.

### Borrow Model

- `book` (ObjectId) — Mandatory, references Book.
- `quantity` (number) — Mandatory, positive integer.
- `dueDate` (date) — Mandatory.

---

## ⚡ API Endpoints

### 1. Create Book

**POST** `/api/books`

**Request:**

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```
