'use client';
import UserButton from '@/components/auth/user-button';
import { Button } from '@/components/ui/button';
import * as Routes from '@/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav className='bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px]'>
            <div className='flex gap-x-2'>
                <Button asChild variant={pathname === Routes.ROUTE_SERVER_PAGE ? "default" : "outline"}>
                    <Link href={Routes.ROUTE_SERVER_PAGE}>
                        Server
                    </Link>
                </Button>
                <Button asChild variant={pathname === Routes.ROUTE_CLIENT_PAGE ? "default" : "outline"}>
                    <Link href={Routes.ROUTE_CLIENT_PAGE}>
                        Client
                    </Link>
                </Button>
                <Button asChild variant={pathname === Routes.ROUTE_ADMIN_PAGE ? "default" : "outline"}>
                    <Link href={Routes.ROUTE_ADMIN_PAGE}>
                        Admin
                    </Link>
                </Button>
                <Button asChild variant={pathname === Routes.ROUTE_USER_PAGE ? "default" : "outline"}>
                    <Link href={Routes.ROUTE_USER_PAGE}>
                        Home
                    </Link>
                </Button>
                <Button asChild variant={pathname === Routes.ROUTE_SETTINGS_PAGE ? "default" : "outline"}>
                    <Link href={Routes.ROUTE_SETTINGS_PAGE}>
                        Settings
                    </Link>
                </Button>
            </div>
            <UserButton />
        </nav>
    );
};

export default Navbar;