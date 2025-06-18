
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from '../pages/BookList';
import AddBook from '../pages/AddBook';
import BookDetail from '../pages/BookDetail';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
