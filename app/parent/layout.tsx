import { ReactNode } from 'react';
import Link from 'next/link';
import { logout } from '@/lib/actions/auth';
import React from 'react';
import { LogoutButton } from '@/components/forms/LogoutButton';

export default function ParentLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md">
                <nav className="mt-5 px-2">
                    <Link href="/parent/dashboard" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-900 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150">
                        Dashboard
                    </Link>
                    <Link href="/parent/children" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150">
                        My Children
                    </Link>
                    <Link href="/parent/books" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150">
                        Books
                    </Link>
                    <LogoutButton />
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto p-5">
                {children}
            </main>
        </div>
    );
}