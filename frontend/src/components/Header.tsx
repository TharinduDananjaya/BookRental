import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Book, LogOut, User } from 'lucide-react';
import { logout } from '../features/auth/authSlice';
import { Button } from './ui/button';
import { RootState, AppDispatch } from '../app/store';

const Header: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-amber-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and App Name */}
          <Link to="/" className="flex items-center space-x-2 hover:text-amber-200 transition-colors">
            <Book size={32} />
            <h1 className="text-2xl font-bold">BookRental</h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
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

            {user?.role === 'admin' && (
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
            )}

            <div className="flex items-center space-x-4 ml-6 border-l border-amber-700 pl-6">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2">
                    <User size={18} />
                    <span className="text-sm">
                      {user?.name} ({user?.role})
                    </span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-white"
                  >
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-medium hover:text-amber-200 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center space-x-2">
            {user?.role === 'admin' && (
              <Link
                to="/add-book"
                className="bg-amber-700 hover:bg-amber-600 px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Add Book
              </Link>
            )}

            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-transparent border-amber-600 text-amber-100 hover:bg-amber-800"
              >
                <LogOut size={16} />
              </Button>
            ) : (
              <Link
                to="/login"
                className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
