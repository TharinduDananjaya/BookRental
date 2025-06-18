
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks, setFilters } from '../features/books/booksSlice';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { RootState, AppDispatch } from '../app/store';

const BookList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading, error, currentPage, totalPages, filters } = useSelector((state: RootState) => state.books);
  const [searchAuthor, setSearchAuthor] = useState(filters.author);
  const [availabilityFilter, setAvailabilityFilter] = useState(filters.available);
  const [searchTitle, setSearchTitle] = useState(filters.title);

  useEffect(() => {
    dispatch(fetchBooks({ page: currentPage, ...filters }));
  }, [dispatch, currentPage, filters]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    }
  }, [error]);

  const handleSearch = () => {
    dispatch(setFilters({ author: searchAuthor, is_available: availabilityFilter, title: searchTitle }));
    dispatch(fetchBooks({ page: 1, author: searchAuthor, is_available: availabilityFilter, title: searchTitle }));
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchBooks({ page, ...filters }));
  };

  const clearFilters = () => {
    setSearchAuthor('');
    setSearchTitle('');
    setAvailabilityFilter('');
    dispatch(setFilters({ author: '', available: '', title: '' }));
    dispatch(fetchBooks({ page: 1 }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Book Library</h1>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Author
              </label>
              <input
                type="text"
                value={searchAuthor}
                onChange={(e) => setSearchAuthor(e.target.value)}
                placeholder="Enter author name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Title
              </label>
              <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="Enter Title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">All Books</option>
                <option value="true">Available</option>
                <option value="false">Rented</option>
              </select>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleSearch} className="flex items-center">
                <Search size={16} className="mr-2" />
                Search
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      )}

      {/* Books Grid */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {books.map(book => (
              <Card key={book.id} className="h-full">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 mb-2">by {book.author}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Published: {new Date(book.published_date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      book.is_available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {book.is_available ? 'Available' : 'Rented'}
                    </span>
                    
                    <Link to={`/book/${book.id}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {books.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          
            <div className="flex justify-center items-center space-x-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          
        </>
      )}
    </div>
  );
};

export default BookList;
