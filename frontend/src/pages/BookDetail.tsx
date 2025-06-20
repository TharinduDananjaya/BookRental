import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById, rentBook, returnBook } from '../features/books/booksSlice';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from '@/hooks/use-toast';
import { RootState, AppDispatch } from '../app/store';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentBook, loading, error } = useSelector((state: RootState) => state.books);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));
    }
  }, [dispatch, id]);


  const handleRentBook = async () => {
  if (!id || !currentBook) return;

  try {
    await dispatch(rentBook(id)).unwrap();
    dispatch(fetchBookById(id)); // ← re-fetch updated book
    toast({
      title: "Success!",
      description: "Book rented successfully.",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to rent book. Please try again.",
      variant: "destructive"
    });
  }
};

const handleReturnBook = async () => {
  if (!id || !currentBook) return;

  if (user?.role !== 'admin') {
    toast({
      title: "Access Denied",
      description: "Only admins can mark books as returned.",
      variant: "destructive"
    });
    return;
  }

  try {
    await dispatch(returnBook(id)).unwrap();
    dispatch(fetchBookById(id)); // ← re-fetch updated book
    toast({
      title: "Success!",
      description: "Book returned successfully.",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to return book. Please try again.",
      variant: "destructive"
    });
  }
};


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-lg">Loading book details...</div>
        </div>
      </div>
    );
  }

  if (error || !currentBook) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The requested book could not be found.'}</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Button 
          onClick={() => navigate('/')} 
          variant="outline" 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Button>


        <Card className="max-w-3xl mx-auto">
  <div className="p-4 md:p-6">
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <div className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-amber-200 rounded-md flex items-center justify-center mb-4">
          <BookOpen size={48} className="text-amber-600" />
        </div>
      </div>
      
      <div className="space-y-4 text-sm">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            {currentBook.title}
          </h1>
          <div className="flex items-center text-gray-600 mb-2">
            <User className="mr-1 h-4 w-4" />
            <span>by {currentBook.author}</span>
          </div>
          
          <div className="flex items-center text-gray-500 mb-4">
            <Calendar className="mr-1 h-4 w-4" />
            <span>Published: {new Date(currentBook.published_date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Availability:</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              currentBook.is_available 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {currentBook.is_available ? 'Available' : 'Rented'}
            </span>
          </div>

          <div>
            {currentBook.is_available ? (
              <Button 
                onClick={handleRentBook}
                disabled={loading}
                className="w-full text-sm"
              >
                {loading ? 'Processing...' : 'Rent This Book'}
              </Button>
            ) : (
              user?.role === 'admin' && (
                <Button 
                  onClick={handleReturnBook}
                  disabled={loading}
                  variant="outline"
                  className="w-full text-sm"
                >
                  {loading ? 'Processing...' : 'Mark as Returned'}
                </Button>
              )
            )}
          </div>
        </div>

        {currentBook.description && (
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-600">{currentBook.description}</p>
          </div>
        )}

        {currentBook.isbn && (
          <div className="border-t pt-4 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-medium text-gray-700">ISBN:</span>
              <p className="text-gray-600">{currentBook.isbn}</p>
            </div>
            {currentBook.genre && (
              <div>
                <span className="font-medium text-gray-700">Genre:</span>
                <p className="text-gray-600">{currentBook.genre}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
</Card>

      </div>
    </div>
  );
};

export default BookDetail;
