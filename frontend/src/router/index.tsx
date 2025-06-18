
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from '../pages/BookList';
import AddBook from '../pages/AddBook';
import BookDetail from '../pages/BookDetail';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/login" element={<div>Login Page (to be implemented)</div>} />
      <Route path="/register" element={<div>Register Page (to be implemented)</div>} />
    </Routes>
  );
};

export default AppRouter;
