<?php

namespace Database\Seeders;


use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
     
        $userRepository = app()->make(UserRepository::class);
        $array = [
            [
                'name' => 'Admin User',
                'email' => 'admin@bookrent.com',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ],
            [
                'name' => 'Regular User',
                'email' => 'user@bookrent.com',
                'password' => Hash::make('user123'),
                'role' => 'user',
            ],
        ];
        foreach ($array as $data) {
            if (!$userRepository->getByEmail($data['email'])) {
                $userRepository->create($data);
            }
        }
    }
}
