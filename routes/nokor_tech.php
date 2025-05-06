<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\NokorTechController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [NokorTechController::class, 'index']);
Route::get('/about-us', [NokorTechController::class, 'about']);

Route::get('/contact-us', [NokorTechController::class, 'contact']);
Route::post('/submit-message', [MessageController::class, 'store']);

Route::get('/blogs', [NokorTechController::class, 'blogs']);
Route::get('/blogs/{id}', [NokorTechController::class, 'blog_show']);
Route::get('/products', [NokorTechController::class, 'products']);
Route::get('/products/{id}', [NokorTechController::class, 'product_show']);
Route::get('/shopping-cart', [NokorTechController::class, 'shopping_cart']);
Route::get('/checkout', [NokorTechController::class, 'checkout']);
Route::get('/checkout_success', [NokorTechController::class, 'success']);
