
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById, rentBook, returnBook, clearCurrentBook } from '../features/books/booksSlice';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from '@/hooks/use-toast';
import { RootState, AppDispatch } from '../app/store';
import Modal from '../components/Modal';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentBook, loading, error } = useSelector((state: RootState) => state.books);
  const [showRentModal, setShowRentModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));
    }
    
    return () => {
      dispatch(clearCurrentBook());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    }
  }, [error]);

  const handleRentBook = async () => {
    if (!id) return;
    
    try {
      await dispatch(rentBook(id)).unwrap();
      toast({
        title: "Success!",
        description: "Book rented successfully!",
      });
      await dispatch(fetchBookById(id));
      setShowRentModal(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to rent book. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleReturnBook = async () => {
    if (!id) return;
    
    try {
      await dispatch(returnBook(id)).unwrap();
      toast({
        title: "Success!",
        description: "Book returned successfully!",
      });
      await dispatch(fetchBookById(id));
      setShowReturnModal(false);
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
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      </div>
    );
  }

  if (!currentBook) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Book not found.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Back to Library
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          ← Back to Library
        </Button>

        <Card>
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Book Cover Placeholder */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg aspect-[3/4] flex items-center justify-center shadow-lg">
                  <div className="text-center p-6">
                    <div className="text-4xl font-bold text-amber-800 mb-2">
                      {currentBook.title.split(' ').map(word => word[0]).join('').slice(0, 3)}
                    </div>
                    <div className="text-sm text-amber-600 font-medium">
                      Book Cover
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentBook.is_available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {currentBook.is_available ? 'Available for Rent' : 'Currently Rented'}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {currentBook.title}
                </h1>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-24">Author:</span>
                    <span className="text-gray-900">{currentBook.author}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-24">Published:</span>
                    <span className="text-gray-900">
                      {new Date(currentBook.published_date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {currentBook.isbn && (
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 w-24">ISBN:</span>
                      <span className="text-gray-900">{currentBook.isbn}</span>
                    </div>
                  )}
                  
                  {currentBook.genre && (
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 w-24">Genre:</span>
                      <span className="text-gray-900">{currentBook.genre}</span>
                    </div>
                  )}
                </div>

                {currentBook.description && (
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-700 mb-2">Description:</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {currentBook.description}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  {currentBook.is_available ? (
                    <Button
                      onClick={() => setShowRentModal(true)}
                      size="lg"
                    >
                      Rent This Book
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setShowReturnModal(true)}
                      size="lg"
                      variant="outline"
                    >
                      Return This Book
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Rent Confirmation Modal */}
        <Modal
          isOpen={showRentModal}
          onClose={() => setShowRentModal(false)}
          title="Confirm Book Rental"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to rent "<strong>{currentBook.title}</strong>" by {currentBook.author}?
            </p>
            
            <div className="flex space-x-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowRentModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRentBook}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Confirm Rental'}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Return Confirmation Modal */}
        <Modal
          isOpen={showReturnModal}
          onClose={() => setShowReturnModal(false)}
          title="Confirm Book Return"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to return "<strong>{currentBook.title}</strong>" by {currentBook.author}?
            </p>
            
            <div className="flex space-x-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowReturnModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReturnBook}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Confirm Return'}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BookDetail;
