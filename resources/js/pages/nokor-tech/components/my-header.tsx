import ToggleModeSwitch from '@/components/toggle-mode-switch';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Search, User2Icon } from 'lucide-react';
import CartButton from './cart-button';
import { MyCategoriesNav } from './my-categories-nav';
import { MySearchProducts } from './my-search-products';
import MySelectLanguageSwitch from '@/components/my-select-language-switch';
import useTranslation from '@/hooks/use-translation';

const MyHeader = () => {
    const { t, currentLocale } = useTranslation();
    const { application_info, links, post_counts, item_categories } = usePage().props;
    const currentPath = window.location.pathname;
    const navItems = [
        { label: t('Products'), href: '/products' },
        { label: t('Blogs'), href: '/blogs', condition: post_counts > 0 },
        { label: t('Contact'), href: '/contact-us' },
        { label: t('About'), href: '/about-us' },
    ];


    return (
        <>
            <nav className="bg-true-primary text-white">
                <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 text-sm text-gray-300">
                    <Link prefetch href="/" className="flex items-center gap-2">
                        <img
                            width={65}
                            height={65}
                            src={`/assets/images/application_info/thumb/${application_info?.image}`}
                            alt={`${application_info?.name_kh}'s logo`}
                            className="hover:cursor-pointer p-2 rounded-xl"
                        />
                        <span className="text-lg font-semibold text-white">{currentLocale === "kh" ? application_info.name_kh : application_info?.name}</span>
                    </Link>
                    <div className="items-center gap-2 lg:flex">
                        <div className="hidden items-center lg:flex">
                            <div className="max-w-xs font-semibold whitespace-pre-wrap text-white/70">{currentLocale === "kh" ? application_info?.address_kh : application_info?.address}</div>
                            <span className="pl-2 font-semibold text-white underline hover:cursor-pointer">
                                <Link href="/contact-us" prefetch>
                                    <button className="relative cursor-pointer underline underline-offset-[5.5px] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-white">
                                        {t('Contact Us')}
                                    </button>
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 font-semibold text-white">
                        <p className="hidden sm:block">
                            Call Us :{' '}
                            <a className="hover:underline" href={`tel:${application_info?.phone}`}>
                                {/* {application_info?.phone} */}
                                <strong>{t("Phone")} :</strong> {application_info?.phone}
                            </a>
                        </p>
                        <div className="flex gap-2">
                            {links?.map((item) => (
                                <a key={item?.id} href={item?.link ? item?.link : '#'}>
                                    <img
                                        width={32}
                                        height={32}
                                        src={`/assets/images/links/thumb/${item?.image}`}
                                        alt=""
                                        className="transition-all duration-300 hover:scale-125 hover:cursor-pointer"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="bg-background sticky top-0 z-50">
                <header>
                    <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-2 lg:py-4">
                        <div className="flex items-center">
                            <Sheet>
                                <div className="flex items-center gap-2">
                                    <SheetTrigger>
                                        <Menu className="text-primary size-8 lg:hidden" />
                                    </SheetTrigger>
                                    {/* <Link href="/">
                                        <img
                                            width={65}
                                            height={65}
                                            src="/assets/nokor-tech/images/logo/logo.png"
                                            alt=""
                                            className="cursor-pointer -translate-y-1"
                                        />
                                    </Link> */}
                                </div>
                                <SheetContent side="left" className="w-64 bg-gray-100 p-6 shadow-md">
                                    <SheetHeader className="mb-4 hidden pb-4">
                                        <SheetTitle className="text-2xl font-bold text-gray-700">{t("Menu")}</SheetTitle>
                                    </SheetHeader>
                                    <ul className="flex flex-col gap-6 font-semibold text-gray-600">
                                        <hr className="mr-6" />
                                        <li className="hover:text-primary transition-colors duration-200 hover:cursor-pointer">
                                            <Link prefetch href="/products">
                                                {t("Products")}
                                            </Link>
                                        </li>
                                        {post_counts > 0 && (
                                            <li className="hover:text-primary transition-colors duration-200 hover:cursor-pointer">
                                                <Link prefetch href="/blogs">
                                                    {t("Blogs")}
                                                </Link>
                                            </li>
                                        )}

                                        <li className="hover:text-primary transition-colors duration-200 hover:cursor-pointer">
                                            <Link prefetch href="/contact-us">
                                                {t("Contact Us")}
                                            </Link>
                                        </li>
                                        <li className="hover:text-primary transition-colors duration-200 hover:cursor-pointer">
                                            <Link prefetch href="/about-us">
                                                {t("About")}
                                            </Link>
                                        </li>
                                    </ul>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div className="hidden flex-1 lg:flex">
                            <ul className="flex items-center gap-2 font-semibold">
                                {item_categories?.length > 0 && (
                                    <>
                                        <li>
                                            <MyCategoriesNav />
                                        </li>
                                        {item_categories?.length > 2 &&
                                            item_categories.slice(0, 3).map((category, index) => (
                                                <li key={index + category?.id} className="flex items-center justify-center">
                                                    <Link
                                                        prefetch
                                                        href={`/products?category_code=${category.code}`}
                                                        className="group hover:text-primary relative mx-2 cursor-pointer"
                                                    >
                                                        {currentLocale === "kh" ? category.name_kh : category.name}
                                                        <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full"></span>
                                                    </Link>
                                                </li>
                                            ))}
                                    </>
                                )}

                                <li key={'seperator'} className="border-primary/5 bg-primary/50 h-6 border"></li>
                                {navItems.map((item, index) =>
                                    item.condition === false ? null : (
                                        <li key={index + item.label} className="flex gap-4">
                                            <Link
                                                prefetch
                                                key={index}
                                                href={item.href}
                                                className={`group relative mx-2 cursor-pointer ${currentPath.startsWith(item.href) ? 'text-primary font-bold' : ''
                                                    } hover:text-primary`}
                                            >
                                                {item.label}
                                                <span
                                                    className={`bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full ${currentPath.startsWith(item.href) ? 'w-full' : ''
                                                        }`}
                                                ></span>
                                            </Link>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                        <div className="flex shrink-0 gap-4">
                            <Sheet>
                                <div className="flex items-center gap-2">
                                    <SheetTrigger asChild>
                                        <Button size="icon" variant="ghost" className="text-primary">
                                            <Search className="text-primary size-6" />
                                        </Button>
                                    </SheetTrigger>
                                </div>
                                <SheetContent side="top" className="w-full p-6 shadow-md">
                                    <SheetHeader>
                                        <SheetTitle>{t("Search Products")}</SheetTitle>
                                    </SheetHeader>
                                    <MySearchProducts className="border-primary mx-auto max-w-full" />
                                </SheetContent>
                            </Sheet>
                            <Link prefetch href="/shopping-cart">
                                <CartButton />
                            </Link>
                            <Link prefetch href="/login">
                                <Button size="icon" variant="ghost" className="text-primary">
                                    <User2Icon />
                                </Button>
                            </Link>
                            <MySelectLanguageSwitch />
                            <ToggleModeSwitch />
                        </div>
                    </div>
                    {/* <div className="md:hidden mx-4 mb-3">
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-gray-400">
                                <img src="/assets/nokor-tech/icons/search.png" alt="" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-10 border border-primary rounded-full px-4 w-full py-2 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                    </div> */}
                </header>
                {/* <hr /> */}
            </div>
        </>
    );
};

export default MyHeader;
