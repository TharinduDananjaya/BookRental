<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'published_date',
        'is_available',
        'rented_at',
        'returned_at'
    ];

    protected $casts = [
        'published_date' => 'date',
        'is_available' => 'boolean',
        'rented_at' => 'datetime',
        'returned_at' => 'datetime'
    ];

    protected $dates = [
        'published_date',
        'rented_at',
        'returned_at',
        'deleted_at'
    ];

    // Scopes
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }

    public function scopeRented($query)
    {
        return $query->where('is_available', false);
    }

    public function scopeByAuthor($query, $author)
    {
        return $query->where('author', 'like', '%' . $author . '%');
    }

    public function scopeByTitle($query, $title)
    {
        return $query->where('title', 'like', '%' . $title . '%');
    }

    // Mutators & Accessors
    public function getStatusAttribute()
    {
        return $this->is_available ? 'Available' : 'Rented';
    }

    public function getRentalDurationAttribute()
    {
        if (!$this->rented_at) {
            return null;
        }

        $endDate = $this->returned_at ?? now();
        return $this->rented_at->diffInDays($endDate);
    }

    // Methods
    public function rent()
    {
        $this->update([
            'is_available' => false,
            'rented_at' => now(),
            'returned_at' => null
        ]);
    }

    public function returnBook()
    {
        $this->update([
            'is_available' => true,
            'returned_at' => now()
        ]);
    }
}