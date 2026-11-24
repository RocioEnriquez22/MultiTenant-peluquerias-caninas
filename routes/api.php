<?php

use App\Http\Controllers\Api\WppWebhookController;
use Illuminate\Support\Facades\Route;

Route::get('/webhooks/whatsapp', [WppWebhookController::class, 'verify']);
Route::post('/webhooks/whatsapp', [WppWebhookController::class, 'handle']);
