<?php

namespace App\Repositories;

use App\Models\Book;

class BookRepository
{
    public function getAll($author = null, $is_available = null)
    {
        $query = Book::query();

        if ($author) {
            $query->where('author', 'like', "%$author%");
        }
        if ($is_available !== null) {
            $query->where('is_available', $is_available== 'true' ? true : false);
        }

        return $query->paginate(6);
    }

    public function getById($id)
    {
        return Book::findOrFail($id);
    }

    public function create(array $data)
    {
        return Book::create($data);
    }

    public function rent($id)
    {
        $book = Book::findOrFail($id);
        if (!$book->is_available) {
            throw new \Exception('Book already rented');
        }
        $book->is_available = false;
        $book->save();
        return $book;
    }

    public function return($id)
    {
        $book = Book::findOrFail($id);
        $book->is_available = true;
        $book->save();
        return $book;
    }
}
