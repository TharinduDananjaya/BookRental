<?php

namespace Database\Seeders;

use App\Repositories\BookRepository;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BooksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bookRepository = app()->make(BookRepository::class);
        
        $array = [
            [
                'title' => 'The Great Gatsby',
                'author' => 'F. Scott Fitzgerald',
                'published_date' => '1925-04-10',
                'is_available' => true,
            ],
            [
                'title' => 'To Kill a Mockingbird',
                'author' => 'Harper Lee',
                'published_date' => '1960-07-11',
                'is_available' => true,
            ],
            [
                'title' => '1984',
                'author' => 'George Orwell',
                'published_date' => '1949-06-08',
                'is_available' => true,
            ],
            [
                'title' => 'Pride and Prejudice',
                'author' => 'Jane Austen',
                'published_date' => '1813-01-28',
                'is_available' => false,
                'rented_at' => now()->subDays(3),
            ],
        ];

        foreach ($array as $data) {
            if (!$bookRepository->getByTitle($data['title'])) {
                $bookRepository->create($data);
            }
        }

    }
}
