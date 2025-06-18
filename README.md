# 📚 BookRental Platform

A fullstack **Mini Book Rental System** built with:

- ⚙️ **Backend**: Laravel 11 + MySQL
- 🧑‍💻 **Frontend**: React + Redux Toolkit + TypeScript

---

## 📝 Project Description

This project simulates a small-scale book rental platform where users can browse, rent, and return books. Admins can add new books and manage rentals.

---

## 🧩 Features

### 🔵 Frontend (React + Redux Toolkit + TypeScript)

- ✅ Paginated **Book List** view
- 🔍 Filter by **author** or **availability**
- 📘 Each book card shows: title, author, and status
- ➕ **Add New Book** form with validation
- 📄 **Book Detail Page**
  - Shows full book info
  - Rent button if book is available
- ⚙️ State Management: **Redux Toolkit** (Redux Thunks)
- 🚀 Form validation: **React Hook Form**
- 🔁 Navigation: **React Router**
- ✨ Good UX: toast notifications, loading & error states

### 🟠 Backend (Laravel 11 + MySQL)

- RESTful API with:
  - `GET /api/books` – List all books (with optional `?author=` or `?is_available=`)
  - `GET /api/books/{id}` – Book details
  - `POST /api/books` – Add a new book (Admin only)
  - `POST /api/books/{id}/rent` – Mark book as rented
  - `POST /api/books/{id}/return` – Mark book as returned (Admin only)
- 🧠 Repository & Service pattern
- 🛡️ Validation: **Form Requests**
- 📦 Consistent API responses using **Resource classes**
- 🔐 Role-based access control (Admin vs User)
- 📊 Database: Migrations + Seeders with sample data

---

## 🚀 Getting Started

### 1️⃣ Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve


### 2️⃣ Frontend (React + Redux Toolkit + TypeScript)
    cd frontend
    npm install
    npm run dev
