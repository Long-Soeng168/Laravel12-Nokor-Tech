import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { MyCategoriesNav } from './my-categories-nav';

export function TopDesktopNav() {
    const { t } = useTranslation();
    const { url } = usePage();

    const navLinks = [
        { label: t('Home'), href: '/' },
        { label: t('Products'), href: '/products' },
        { label: t('Blogs'), href: '/blogs' },
        { label: t('About'), href: '/about-us' },
        { label: t('Contact'), href: '/contact-us' },
    ];

    const isActive = (href: string) => url === href;

    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                {/* Shop Categories Dropdown */}
                <MyCategoriesNav />

                {/* Main Nav Links */}
                {navLinks.map(({ label, href }) => (
                    <NavigationMenuItem key={href}>
                        <NavigationMenuLink asChild className={`ml-1 ${navigationMenuTriggerStyle()} ${isActive(href) ? 'text-primary font-bold' : ''}`}>
                            <Link href={href} prefetch>
                                {label}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
