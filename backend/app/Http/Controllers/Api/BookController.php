<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookRequest;
use App\Http\Resources\BookResource;
use App\Services\BookService;
use Illuminate\Http\Request;

class BookController extends Controller
{
    protected $service;

    public function __construct(BookService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $books = $this->service->getBooks($request->query('author'), $request->query('is_available'));
        return BookResource::collection($books);
    }

    public function show($id)
    {
        $book = $this->service->getBook($id);
        return new BookResource($book);
    }

    public function store(StoreBookRequest $request)
    {
        $book = $this->service->createBook($request->validated());
        
        return new BookResource($book);
    }

    public function rent($id)
    {
        try {
            $book = $this->service->rentBook($id);
            return new BookResource($book);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function return($id)
    {
        $book = $this->service->returnBook($id);
        return new BookResource($book);
    }
}
