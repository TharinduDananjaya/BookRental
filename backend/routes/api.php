<?php

use App\Http\Controllers\Api\BookController;
use Illuminate\Support\Facades\Route;

Route::prefix('books')->group(function () {
    Route::get('/', [BookController::class, 'index']);
    Route::get('{id}', [BookController::class, 'show']);
    Route::post('/', [BookController::class, 'store']);
    Route::post('{id}/rent', [BookController::class, 'rent']);
    Route::post('{id}/return', [BookController::class, 'return']);
});

