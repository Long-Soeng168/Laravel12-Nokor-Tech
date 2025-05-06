<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoPlayList extends Model
{
    /** @use HasFactory<\Database\Factories\VideoPlayListFactory> */
    use HasFactory;
    protected $guarded = [];

    public function videos()
    {
        return $this->hasMany(Video::class, 'playlist_code', 'code');
    }
}
