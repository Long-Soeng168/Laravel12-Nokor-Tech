import { useCart } from '@/contexts/cart-contexts';
import { router } from '@inertiajs/react';
import { ShoppingBagIcon, ShoppingCartIcon } from 'lucide-react';

function AddToCart({ item }: { item: any }) {
    const { addToCart } = useCart();
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => {
                    addToCart(item);
                }}
                className="group border-primary relative w-52 cursor-pointer overflow-hidden rounded-lg border bg-white p-2 text-center font-semibold text-black"
            >
                <div className="flex items-center justify-center gap-2">
                    <ShoppingCartIcon />
                    <span className="inline-block items-center gap-2 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                        Add To Cart
                    </span>
                </div>
                <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
                    <span>Add To Cart</span>
                    <ShoppingCartIcon />
                </div>
                <div className="absolute top-[40%] left-[20%] h-2 w-2 scale-[1] rounded-lg bg-transparent transition-all duration-300 group-hover:top-[0%] group-hover:left-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-[#263381] dark:group-hover:bg-[#263381]"></div>
            </button>
            <button
                onClick={() => {
                    addToCart(item);
                    router.get('/shopping-cart');
                }}
                className="group border-primary relative w-52 cursor-pointer overflow-hidden rounded-lg border bg-[#263381] p-2 text-center font-semibold text-white transition-all duration-300"
            >
                <div className="flex items-center justify-center gap-2">
                    <ShoppingBagIcon />
                    <span className="inline-block items-center gap-2 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                        Buy Now
                    </span>
                </div>

                <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-black opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
                    <span>Buy Now</span>
                    <ShoppingBagIcon />
                </div>

                <div className="absolute top-[40%] left-[20%] h-2 w-2 scale-[1] rounded-lg bg-transparent group-hover:bg-white transition-all duration-300 group-hover:top-0 group-hover:left-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.8]"></div>
            </button>
        </div>
    );
}

export default AddToCart;
