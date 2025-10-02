import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-contexts';
import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';

const CartButton = () => {
    const { cartItems } = useCart();
    return (
        <Link href={`/shopping-cart`}>
            <Button size="icon" variant="outline" className="text-primary size-9 relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems?.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                        {cartItems.length}
                    </span>
                )}
            </Button>
        </Link>
    );
};

export default CartButton;
