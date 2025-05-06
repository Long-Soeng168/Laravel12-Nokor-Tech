import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { router, usePage } from '@inertiajs/react';
import { AlignLeft } from 'lucide-react';
import { useState } from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const Filters = () => {
    const { item_categories, item_brands } = usePage().props;
    const initialQueryParams = new URLSearchParams(window.location.search);
    const currentPath = window.location.pathname;
    function handleSubmit(key: string, value?: string) {
        try {
            const queryParams = new URLSearchParams(window.location.search);
            if (value) {
                queryParams.set(key, value);
            } else {
                queryParams.delete(key);
            }
            queryParams.set('page', '1');
            const queryParamsString = queryParams.toString();
            router.get(currentPath + '?' + queryParamsString);
        } catch (error) {
            console.error('Form submission error', error);
        }
    }

    // Brands
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(initialQueryParams?.get('brand_code') || '');
    // Brands

    const selectedCategoryCode = initialQueryParams.get('category_code') || '';

    // Find which parent category should be open
    const openCategory = item_categories?.find(
        (category) => category.code === selectedCategoryCode || category.children?.some((child) => child.code === selectedCategoryCode),
    )?.code;
    return (
        <div>
            <div className="bg-primary/5 rounded-md px-2 py-2">
                <div className="flex flex-col items-center">
                    <h3 className="mb-4 text-xl font-semibold">Filters</h3>
                </div>
                <div>
                    <button
                        onClick={() => handleSubmit('category_code', '')}
                        className={`${!initialQueryParams.get('category_code') && 'text-true-primary font-bold underline underline-offset-4'} hover:text-primary flex w-full flex-1 cursor-pointer items-center gap-1 p-1 hover:underline`}
                    >
                        <span className="mr-1 size-6 object-contain">
                            <AlignLeft size={24} className="stroke-primary" />
                        </span>
                        All Categories
                    </button>

                    {item_categories?.length > 0 &&
                        item_categories?.map((category) => (
                            <Accordion type="single" collapsible defaultValue={openCategory}>
                                <AccordionItem value={category?.code}>
                                    <div className="m-0.5 flex w-full items-center justify-between text-base">
                                        <button
                                            onClick={() => handleSubmit('category_code', category?.code)}
                                            className={`${initialQueryParams.get('category_code') == category?.code && 'text-true-primary font-bold underline underline-offset-4'} hover:text-primary flex w-full flex-1 cursor-pointer items-center gap-1 p-1 hover:underline`}
                                        >
                                            {category?.image ? (
                                                <img
                                                    className="mr-1 size-6 object-contain"
                                                    src={`/assets/images/item_categories/thumb/${category?.image}`}
                                                    alt=""
                                                />
                                            ) : (
                                                <span className="mr-1 size-6 object-contain" />
                                            )}
                                            {category?.name}
                                        </button>
                                        {category?.children?.length > 0 && (
                                            <AccordionTrigger className="hover:bg-secondary cursor-pointer border p-0.5"></AccordionTrigger>
                                        )}
                                    </div>
                                    {category?.children?.length > 0 && (
                                        <AccordionContent>
                                            <ul className="border-primary ml-4 border-l-2 pl-4 text-sm">
                                                {category?.children?.map((subCategory) => (
                                                    <li>
                                                        <button
                                                            className={`${initialQueryParams.get('category_code') == subCategory?.code && 'text-true-primary font-bold underline underline-offset-4'} hover:text-primary w-full cursor-pointer p-1 text-start hover:underline`}
                                                            onClick={() => handleSubmit('category_code', subCategory?.code)}
                                                        >
                                                            {subCategory?.name}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    )}
                                </AccordionItem>
                            </Accordion>
                        ))}
                </div>
                {/* end category  */}

                {/* Brands */}
                <div className="mt-8">
                    <p className="text-primary mb-2 flex items-center gap-1 text-sm font-semibold">
                        <AlignLeft size={18} /> Brands
                    </p>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                                {value
                                    ? (() => {
                                          const selectedBrand = item_brands.find((brand) => brand.code === value);
                                          return selectedBrand ? (
                                              <div className="flex items-center gap-2">
                                                  {selectedBrand.image ? (
                                                      <span className="rounded bg-white p-0.5">
                                                          <img
                                                              src={`/assets/images/item_brands/thumb/${selectedBrand.image}`}
                                                              alt={selectedBrand.name}
                                                              className="size-7 object-contain"
                                                          />
                                                      </span>
                                                  ) : (
                                                      <span className="size-8 object-contain" />
                                                  )}
                                                  {selectedBrand.name}
                                              </div>
                                          ) : (
                                              'Select brand...'
                                          );
                                      })()
                                    : 'Select brand...'}

                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search brand..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No brand found.</CommandEmpty>
                                    <CommandGroup>
                                        <CommandItem
                                            value=""
                                            onSelect={() => {
                                                handleSubmit('brand_code', '');
                                                setOpen(false);
                                            }}
                                        >
                                            <span className="rounded bg-white p-0.5">
                                                <AlignLeft size={30} className="stroke-true-primary !size-8 stroke-[1.5]" />
                                            </span>
                                            All Brands
                                            <Check className={cn('ml-auto', value === '' ? 'opacity-100' : 'opacity-0')} />
                                        </CommandItem>
                                        {item_brands?.map((brand) => (
                                            <CommandItem
                                                key={brand.code}
                                                value={brand.code}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? '' : currentValue);
                                                    handleSubmit('brand_code', currentValue);
                                                    setOpen(false);
                                                }}
                                            >
                                                <span className="rounded bg-white p-0.5">
                                                    {brand?.image ? (
                                                        <img
                                                            className="size-8 object-contain"
                                                            src={`/assets/images/item_brands/thumb/${brand?.image}`}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <span className="size-8 object-contain" />
                                                    )}
                                                </span>
                                                {brand.name}
                                                <Check className={cn('ml-auto', value === brand.code ? 'opacity-100' : 'opacity-0')} />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                {/* End Brands */}

                {/* <Button className="my-8 w-full">Apply Filter</Button> */}

                {/* end filter name */}
            </div>
        </div>
    );
};

export default Filters;
