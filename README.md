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

### 2. Get All Books

**GET** `/api/books`

Retrieve a list of all books in the library. Supports **filtering, sorting, and limiting**.

#### Query Parameters:

| Parameter | Type   | Description                                             |
| --------- | ------ | ------------------------------------------------------- |
| `filter`  | string | Filter books by genre (e.g., FICTION, SCIENCE, FANTASY) |
| `sortBy`  | string | Field to sort by (e.g., `createdAt`)                    |
| `sort`    | string | Sort order: `asc` or `desc`                             |
| `limit`   | number | Maximum number of results to return (default: 10)       |

### 3. Get Book by ID

**GET** `/api/books/:bookId`

Retrieve a single book’s details using its unique ID.

#### URL Parameters:

| Parameter | Type   | Description                |
| --------- | ------ | -------------------------- |
| `bookId`  | string | The unique ID of the book. |

### 4. Update Book

**PUT** `/api/books/:bookId`

Update the details of an existing book. Only provide the fields you want to update.

#### URL Parameters:

| Parameter | Type   | Description                |
| --------- | ------ | -------------------------- |
| `bookId`  | string | The unique ID of the book. |

### 5. Delete Book

**DELETE** `/api/books/:bookId`

Delete a book from the library by its ID.

#### URL Parameters:

| Parameter | Type   | Description                |
| --------- | ------ | -------------------------- |
| `bookId`  | string | The unique ID of the book. |

### 6. Borrow a Book

**POST** `/api/borrow`

Borrow a book from the library. Business logic ensures proper copies management.

#### Business Logic:

- Verify the book has enough available copies.
- Deduct the requested quantity from the book’s copies.
- If copies reach 0, update `available` to false.
- Save the borrow record.

#### Request Body:

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

### 7. Borrowed Books Summary

**GET** `/api/borrow`

Retrieve a summary of all borrowed books using **MongoDB aggregation**.

This endpoint returns:

- Total borrowed quantity per book (`totalQuantity`)
- Book details (`title` and `isbn`)

## ⚙ Installation & Setup

Follow these steps to set up and run the **Library Management API** locally.

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <https://github.com/Chanbadsha/-A-Library-Management-API-with-Express-TypeScript-MongoDB.git>
cd library-management-api
```

### 2. Install Dependencies

Make sure you have Node.js (v18+) installed. Then run:

```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file in the project root and add the following:

MONGO_URI=<your-mongodb-connection-string>
PORT=5000

MONGO_URI — Your MongoDB connection string.

PORT — Port number for the server (default: 5000).

### 4. Run the Server

Development Mode (with live reload using Nodemon):

```bash
npm run dev
```

Server should start and listen on the configured PORT:

Server running on http://localhost:5000
Connected to MongoDB

---

## ✅ Project Complete

This Library Management API demonstrates a full-featured backend system using **Express, TypeScript, and MongoDB**.

Key highlights:

- Proper **schema validation** for books and borrows
- **Business logic enforcement** for borrowing and availability
- Use of **Mongoose static methods** and **middleware**
- **Aggregation pipelines** for summary reports
- Clear and consistent **error handling**

Feel free to **fork this project**, experiment with it, and extend it further.  
Happy coding! 🚀
