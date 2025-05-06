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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_free')->nullable()->default(false);
            $table->string('title');
            $table->string('title_kh')->nullable();
            $table->string('video_file')->nullable();
            $table->string('image')->nullable();
            $table->string('playlist_code')->nullable(); // optional if you're using foreign keys with 'code'
            $table->string('status')->nullable()->default('active');
            $table->text('short_description')->nullable();
            $table->text('short_description_kh')->nullable();
            $table->bigInteger('total_view_counts')->nullable();

            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->onUpdate('CASCADE')
                ->onDelete('SET NULL');

            $table->unsignedBigInteger('updated_by')->nullable();
            $table->foreign('updated_by')
                ->references('id')
                ->on('users')
                ->onUpdate('CASCADE')
                ->onDelete('SET NULL');

            $table->foreignId('video_play_list_id')->nullable()->constrained('video_play_lists')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
