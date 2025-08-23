import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import React from 'react';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

interface MyCategoryListProps {
    items: any[];
}

const MyCategoryList: React.FC<MyCategoryListProps> = ({ items }) => {
    const { currentLocale } = useTranslation();

    return (
        <ScrollArea>
            <div className="flex w-max gap-3 pb-4">
                {items.map((item) => (
                    <Link
                        prefetch
                        href={`/products?category_code=${item?.code}`}
                        key={item?.id}
                        className="group bg-background hover:border-primary flex h-full shrink-0 flex-col items-center justify-start gap-2 rounded-xl border px-2 py-2 transition-all duration-300 hover:shadow-sm
                                   min-w-[110px] sm:min-w-[130px] md:min-w-[150px] lg:min-w-[160px]"
                    >
                        {item?.image && (
                            <img
                                src={`/assets/images/item_categories/thumb/${item?.image}`}
                                alt={`Category ${item?.name}`}
                                className="size-12 md:size-13 object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                        )}
                        <p className="text-muted-foreground group-hover:text-primary line-clamp-2 text-center text-xs sm:text-sm font-medium dark:text-white">
                            {currentLocale === 'kh' ? item?.name_kh : item?.name}
                        </p>
                    </Link>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};

export default MyCategoryList;
