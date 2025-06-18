
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addBook } from '../features/books/booksSlice';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from '@/hooks/use-toast';
import { RootState, AppDispatch } from '../app/store';
import { BookFormData } from '@/types';


const AddBook: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.books);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<BookFormData>();

  const onSubmit = async (data: BookFormData) => {
    try {
      await dispatch(addBook(data)).unwrap();
      toast({
        title: "Success!",
        description: "Book added successfully to the library.",
      });
      reset();
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add book. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Add New Book</h1>
        
        <Card>
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title *
                </label>
                <input
                  type="text"
                  {...register('title', { 
                    required: 'Title is required',
                    minLength: { value: 2, message: 'Title must be at least 2 characters' }
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter book title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  {...register('author', { 
                    required: 'Author is required',
                    minLength: { value: 2, message: 'Author name must be at least 2 characters' }
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.author ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Published Date *
                </label>
                <input
                  type="date"
                  {...register('published_date', { 
                    required: 'Published date is required',
                    validate: (value: string) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      return selectedDate <= today || 'Published date cannot be in the future';
                    }
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.published_date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.published_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.published_date.message}</p>
                )}
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Adding...' : 'Add Book to Library'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddBook;
