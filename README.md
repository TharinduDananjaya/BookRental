# BookRental

A full-stack Book Rental application with a Laravel backend and a React + Reduxtoolkit + Vite frontend.

## Project Structure

```
.
├── README.md
├── backend/   # Laravel API backend
└── frontend/  # React + Vite frontend
```

## Technologies Used

### Backend
- [Laravel](https://laravel.com/) (PHP)
- Composer

### Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js & npm ([install guide](https://github.com/nvm-sh/nvm#installing-and-updating))
- PHP (>=8.1)
- Composer
- MySQL or another supported database

### Backend Setup

```sh
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend Setup

```sh
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` by default.

## Contributing

Pull requests are welcome! Please see the contributing guidelines in [backend/README.md](backend/README.md).

## License

This project is open-sourced under the [MIT license](https://opensource.org/licenses/MIT).
