<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Http\Requests\StoreVideoPlayListRequest;
use App\Http\Requests\UpdateVideoPlayListRequest;
use App\Models\VideoPlayList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoPlayListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');

        $query = VideoPlayList::query();

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                $sub_query->where('code', 'LIKE', "%{$search}%")
                    ->orWhere('name', 'LIKE', "%{$search}%")
                    ->orWhere('name_kh', 'LIKE', "%{$search}%")
                    ->orWhere('short_description', 'LIKE', "%{$search}%")
                    ->orWhere('short_description_kh', 'LIKE', "%{$search}%");
            });
        }

        $query->orderBy($sortBy, $sortDirection);

        $tableData = $query->paginate(perPage: 10)->onEachSide(1);

        return Inertia::render('admin/video_play_lists/Index', [
            'tableData' => $tableData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/video_play_lists/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:video_play_lists,code',
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'nullable|string|in:active,inactive',
            'short_description' => 'nullable|string',
            'short_description_kh' => 'nullable|string',
        ]);



        $validated['created_by'] = $request->user()->id;
        $validated['updated_by'] = $request->user()->id;

        $image_file = $request->file('image');
        unset($validated['image']);

        foreach ($validated as $key => $value) {
            if ($value === null || $value === '') {
                unset($validated[$key]);
            }
        }

        if ($image_file) {
            try {
                $created_image_name = ImageHelper::uploadAndResizeImage($image_file, 'assets/images/video_play_lists', 600);
                $validated['image'] = $created_image_name;
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to upload image: ' . $e->getMessage());
            }
        }

        VideoPlayList::create($validated);

        return redirect()->route('video_play_lists.index')->with('success', 'Video play list created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(VideoPlayList $videoPlayList)
    {
        return Inertia::render('admin/video_play_lists/Show', [
            'videoPlayList' => $videoPlayList
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VideoPlayList $videoPlayList)
    {
        return Inertia::render('admin/video_play_lists/Edit', [
            'videoPlayList' => $videoPlayList
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VideoPlayList $videoPlayList)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:video_play_lists,code,' . $videoPlayList->id,
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'nullable|string|in:active,inactive',
            'short_description' => 'nullable|string',
            'short_description_kh' => 'nullable|string',
        ]);
        $validated['updated_by'] = $request->user()->id;

        $image_file = $request->file('image');
        unset($validated['image']);

        foreach ($validated as $key => $value) {
            if ($value === null || $value === '') {
                unset($validated[$key]);
            }
        }

        if ($image_file) {
            try {
                $created_image_name = ImageHelper::uploadAndResizeImage($image_file, 'assets/images/video_play_lists', 600);
                $validated['image'] = $created_image_name;

                if ($videoPlayList->image && $created_image_name) {
                    ImageHelper::deleteImage($videoPlayList->image, 'assets/images/video_play_lists');
                }
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to upload image: ' . $e->getMessage());
            }
        }
        $videoPlayList->update($validated);

        return redirect()->route('video_play_lists.index')->with('success', 'Video play list updated successfully!');
    }
    public function update_status(Request $request, VideoPlayList $videoPlayList)
    {
        $request->validate([
            'status' => 'required|string|in:active,inactive',
        ]);
        $videoPlayList->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VideoPlayList $videoPlayList)
    {
        // Delete image if exists
        if ($videoPlayList->image) {
            ImageHelper::deleteImage($videoPlayList->image, 'assets/images/video_play_lists');
        }
        $videoPlayList->delete();

        return redirect()->route('video_play_lists.index')->with('success', 'Video play list deleted successfully!');
    }
}
