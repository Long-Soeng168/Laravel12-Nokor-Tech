import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link } from '@inertiajs/react';
import React from 'react';

interface MyBrandListProps {
    items: any;
}

const MyBrandList: React.FC<MyBrandListProps> = ({ items }) => {
    return (
        <Carousel>
            <CarouselContent className="p-2">
                {items?.map((item, i) => (
                    <CarouselItem key={item.id} className="basis-1/2 md:basis-1/3 xl:basis-1/6">
                        <Link
                            prefetch
                            href={`/products?brand_code=${item?.code}`}
                            key={i}
                            className="border-primary flex cursor-pointer flex-col items-center justify-center gap-2 rounded border border-dashed bg-white p-2 transition-all duration-300 hover:-translate-2 hover:border-solid hover:shadow-[5px_5px_rgba(104,_96,_255,_0.4),_10px_10px_rgba(104,_96,_255,_0.3),_15px_15px_rgba(104,_96,_255,_0.2)]"
                        >
                            <img src={`/assets/images/item_brands/thumb/${item.image}`} alt={`Partner ${i + 1}`} className="h-16 object-contain" />
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className="absolute top-1/2 -left-2 z-10 -translate-y-1/2 transform" />
            <CarouselNext className="absolute top-1/2 -right-2 z-10 -translate-y-1/2 transform" />
        </Carousel>
    );
};

export default MyBrandList;
