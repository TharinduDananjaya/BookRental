<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->date('published_date');
            $table->boolean('is_available')->default(true);
            $table->timestamp('rented_at')->nullable();
            $table->timestamps();
            
            // Indexes for better query performance
            $table->index('author');
            $table->index('is_available');
            $table->index(['author', 'is_available']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
