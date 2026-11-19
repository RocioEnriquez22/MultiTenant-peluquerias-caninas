<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CentralAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'ro@admin.com'],
            [
                'name' => 'Moderadora',
                'password' => Hash::make('admin'),
                'is_admin' => true,
                'email_verified_at' => now(),
            ]
        );
    }
}
