<?php

namespace App\Services;

use App\Repositories\BookRepository;

class BookService
{
    protected $repo;

    public function __construct(BookRepository $repo)
    {
        $this->repo = $repo;
    }

    public function getBooks($author, $is_available, $title)
    {
        return $this->repo->getAll($author, $is_available, $title);
    }

    public function getBook($id)
    {
        return $this->repo->getById($id);
    }

    public function createBook($data)
    {
        return $this->repo->create($data);
    }

    public function rentBook($id)
    {
        return $this->repo->rent($id);
    }

    public function returnBook($id)
    {
        return $this->repo->return($id);
    }
}
