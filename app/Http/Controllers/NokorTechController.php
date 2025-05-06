<?php

namespace App\Http\Controllers;

use App\Models\ApplicationInfo;
use App\Models\Banner;
use App\Models\Item;
use App\Models\ItemBrand;
use App\Models\ItemCategory;
use App\Models\ItemDailyView;
use App\Models\Link;
use App\Models\Page;
use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NokorTechController extends Controller
{
    public function index()
    {
        $topBanners = Banner::where('position_code', 'TOP_HOMEPAGE')->orderBy('order_index')->where('status', 'active')->get();
        $middleBanners = Banner::where('position_code', 'MIDDLE_HOMEPAGE')->orderBy('order_index')->where('status', 'active')->get();

        $posts = Post::where('status', 'active')->with('images', 'category')->orderBy('id', 'desc')->limit(3)->get();


        $newArrivals = Item::with('images')->where('status', 'active')->orderBy('id', 'desc')->take(12)->get();
        $brandsWithItems = ItemBrand::with([
            'items' => function ($query) {
                $query->with('images')
                    ->where('items.status', 'active') // Specify 'items' table for status
                    ->orderBy('id', 'desc')
                    ->take(12); // Limit to 12 items
            },
        ])
            ->orderBy('order_index')
            ->where('item_brands.status', 'active') // Specify 'item_categories' table for status
            ->get();


        $categoriesWithItems = ItemCategory::with([
            'items' => function ($query) {
                $query->with('images')
                    ->where('items.status', 'active') // Specify 'items' table for status
                    ->orderBy('id', 'desc')
                    ->take(12); // Limit to 12 items
            },
            'children_items' => function ($query) {
                $query->with('images')
                    ->where('items.status', 'active') // Specify 'items' table for status
                    ->orderBy('id', 'desc')
                    ->take(12); // Limit to 12 child items
            }
        ])
            ->orderBy('order_index')
            ->where('item_categories.status', 'active') // Specify 'item_categories' table for status
            ->whereNull('parent_code') // Only main categories (no parent)
            ->get();

        // Merge 'items' and 'children_items'
        $categoriesWithItems->each(function ($category) {
            // Merge and flatten the collections, then reset the keys
            $category->all_items = $category->items->merge($category->children_items)
                ->sortByDesc('id') // Sort by item ID
                ->take(12) // Limit to 12 items
                ->values(); // Reset the keys to be sequential

            // Optionally, remove the individual 'children_items' and 'items' keys
            unset($category->children_items);
            unset($category->items);
        });

        // return $brandsWithItems;
        return Inertia::render("nokor-tech/Index", [
            'topBanners' => $topBanners,
            'middleBanners' => $middleBanners,
            'posts' => $posts,
            'newArrivals' => $newArrivals,
            'categoriesWithItems' => $categoriesWithItems,
            'brandsWithItems' => $brandsWithItems,
        ]);
    }

    public function about()
    {
        $aboutPages = Page::with('images')->where('position_code', 'ABOUT')->where('status', 'active')->orderBy('order_index')->get();
        // return $aboutPages;
        return Inertia::render("nokor-tech/About", [
            "aboutPages" => $aboutPages
        ]);
    }

    public function contact()
    {
        $contactPage = Page::with('images')->where('position_code', 'CONTACT')->where('status', 'active')->orderBy('order_index')->first();

        return Inertia::render("nokor-tech/Contact", [
            "contactPage" => $contactPage
        ]);
    }

    public function blogs(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $status = $request->input('status');
        $category_code = $request->input('category_code');

        $query = Post::query();

        $query->with('created_by', 'updated_by', 'images', 'category', 'source_detail');

        if ($status) {
            $query->where('status', $status);
        } else {
            $query->where('status', 'active');
        }
        if ($category_code) {
            $query->where('category_code', $category_code);
        }
        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('title_kh', 'LIKE', "%{$search}%");
            });
        }

        $postCategories = PostCategory::where('status', 'active')->orderBy('order_index')->get();

        $tableData = $query->paginate(perPage: 9)->onEachSide(1);
        return Inertia::render('nokor-tech/blogs/Index', [
            'tableData' => $tableData,
            'postCategories' => $postCategories,
        ]);
    }

    public function blog_show($id)
    {
        $post = Post::find($id);
        $postCategories = PostCategory::where('status', 'active')->withCount('posts')->orderBy('order_index')->get();
        $relatedPosts = Post::with('category', 'images')->where('id', '!=', $id)->where('category_code', $post->category_code)->orderBy('id', 'desc')->limit(6)->get();

        return Inertia::render("nokor-tech/blogs/Show", [
            "post" => $post->load('images', 'category'),
            'postCategories' => $postCategories,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    public function products(Request $request)
    {
        $search = $request->input('search', '');
        $brand_code = $request->input('brand_code', '');
        $perPage = $request->input('perPage', 25);
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $category_code = $request->input('category_code', '');

        $query = Item::query();
        $query->with('created_by', 'updated_by', 'images', 'category');

        if ($category_code) {
            // get category and its children codes
            $category = ItemCategory::with('children')->where('code', $category_code)->first();

            if ($category) {
                $categoryCodes = collect([$category->code])
                    ->merge($category->children->pluck('code'))
                    ->toArray();

                $query->whereIn('category_code', $categoryCodes);
            }
        }

        if ($brand_code) {
            $query->where('brand_code', $brand_code);
        }

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('name_kh', 'LIKE', "%{$search}%");
            });
        }

        $query->orderBy($sortBy, $sortDirection);
        $query->where('status', 'active');

        $tableData = $query->paginate(perPage: $perPage)->onEachSide(1);

        $item_brands = ItemBrand::orderBy('order_index')
            ->where('status', 'active') // Specify 'item_categories' table for status
            ->get();
        $productListBanners = Banner::where('position_code', 'PRODUCT_SEARCH')->orderBy('order_index')->where('status', 'active')->get();

        return Inertia::render('nokor-tech/products/Index', [
            'tableData' => $tableData,
            'item_brands' => $item_brands,
            'productListBanners' => $productListBanners,
        ]);
    }

    public function product_show($id)
    {
        $itemShow = Item::find($id);
        $relatedItems = Item::with('category', 'images')->where('id', '!=', $id)->where('category_code', $itemShow->category_code)->orderBy('id', 'desc')->limit(12)->get();

        $date = now()->toDateString();
        $view = ItemDailyView::firstOrCreate(
            ['item_id' => $id, 'view_date' => $date],
            ['view_counts' => 0],
        );
        $view->increment('view_counts');

        $itemShow->update([
            'total_view_counts' => $itemShow->total_view_counts + 1,
        ]);

        return Inertia::render("nokor-tech/products/Show", [
            "itemShow" => $itemShow->load('created_by', 'updated_by', 'images', 'category', 'brand'),
            'relatedItems' => $relatedItems,
        ]);
    }

    public function shopping_cart()
    {
        return Inertia::render("nokor-tech/cart/ShoppingCart");
    }
    public function checkout()
    {
        return Inertia::render("nokor-tech/cart/Checkout");
    }
    public function success()
    {
        return Inertia::render("nokor-tech/cart/Success");
    }
}
