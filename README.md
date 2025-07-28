# Minimal Library Management System 📚

A simple and minimal library management system built with **React**, **Redux Toolkit Query (RTK Query)**, **TypeScript**, **Node.js**, **Express**, and **MongoDB**.

---

## 📝 Project Overview

This project provides a minimal yet functional library management system that allows users to:

- View a list of books
- Add, edit, and delete books
- Borrow books with quantity and due date
- View a summary of all borrowed books

No authentication or payment integration is included to keep it lightweight and focused on core features.

---

## 🚀 Features

- **Public routes** accessible without login or authentication.
- **Book Management**: CRUD operations on books with validations.
- **Borrowing system**: Borrow books with quantity checks and due dates.
- **Borrow Summary**: Aggregated view of borrowed books and total quantities.
- Responsive UI built with **Tailwind CSS**.
- State management and API integration using **Redux Toolkit Query**.
- Backend powered by **Node.js**, **Express.js**, and **MongoDB**.
- TypeScript used throughout frontend and backend for type safety.

---

## 🛠️ Technology Stack

| Layer      | Technology                                           |
| ---------- | ---------------------------------------------------- |
| Frontend   | React, TypeScript, Redux Toolkit Query, Tailwind CSS |
| Backend    | Node.js, Express.js                                  |
| Database   | MongoDB, Mongoose                                    |
| State Mgmt | Redux Toolkit Query                                  |
| Styling    | Tailwind CSS                                         |

---

## 📂 Project Structure

```

/backend
├── controllers/
├── models/
├── routes/
├── app.ts
└── server.ts

/frontend
├── src/
├── components/
├── features/
├── pages/
├── app.tsx
└── store.ts

```

---

## 🔧 Installation & Setup

### Backend

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup `.env` file with your MongoDB connection string:

   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup `.env` file if needed (e.g. API base URL).
4. Start the frontend development server:

   ```bash
   npm start
   ```

---

## 📄 API Endpoints Overview

| Endpoint               | Method | Description                         |
| ---------------------- | ------ | ----------------------------------- |
| `/api/books`           | GET    | Get all books (supports pagination) |
| `/api/books`           | POST   | Create a new book                   |
| `/api/books/:id`       | GET    | Get single book details             |
| `/api/books/:id`       | PUT    | Update a book                       |
| `/api/books/:id`       | DELETE | Delete a book                       |
| `/api/borrows`         | POST   | Borrow a book                       |
| `/api/borrows/summary` | GET    | Get aggregated borrow summary       |

---

## 📱 UI Routes

| Route             | Description                 |
| ----------------- | --------------------------- |
| `/books`          | List all books with actions |
| `/create-book`    | Add a new book              |
| `/books/:id`      | Book details                |
| `/edit-book/:id`  | Edit book                   |
| `/borrow/:bookId` | Borrow a book               |
| `/borrow-summary` | Borrow summary page         |

---

## 🎯 How to Use

1. Browse the book list at `/books`.
2. Add new books via `/create-book`.
3. Edit or delete existing books directly from the list.
4. Borrow a book (if copies available) via the borrow button.
5. View aggregated borrow data in `/borrow-summary`.

---

## 🎉 Bonus Features (Implemented)

- Optimistic UI updates with RTK Query.
- Toast notifications for success/error messages.
- Fully responsive layout using Tailwind CSS.
- Type-safe forms using TypeScript.
