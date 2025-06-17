
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <header className="bg-amber-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:text-amber-200 transition-colors">
            <Book size={32} />
            <h1 className="text-2xl font-bold">BookRental</h1>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/') 
                  ? 'bg-amber-800 text-amber-100' 
                  : 'hover:bg-amber-800 hover:text-amber-100'
              }`}
            >
              Book List
            </Link>
            <Link 
              to="/add-book" 
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/add-book') 
                  ? 'bg-amber-800 text-amber-100' 
                  : 'hover:bg-amber-800 hover:text-amber-100'
              }`}
            >
              Add New Book
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link 
              to="/add-book" 
              className="bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Add Book
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
