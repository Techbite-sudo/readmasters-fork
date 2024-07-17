"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';

export function UserList({ users, currentPage, totalPages, search, userType }: {
    users: Array<{
        id: string;
        name: string;
        email: string;
        userType: string;
    }>;
    currentPage: number;
    totalPages: number;
    search: string;
    userType: string;
}) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/admin/users?page=1&search=${searchTerm}&userType=${userType || ''}`);
    };

    const handleUserTypeChange = (value: string) => {
        router.push(`/admin/users?page=${currentPage}&search=${search || ''}&userType=${value === 'ALL' ? '' : value}`);
    };

    return (
        <div>
            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search users..."
                    className="flex-grow"
                />
                <Button type="submit">Search</Button>
            </form>

            <Select onValueChange={handleUserTypeChange} defaultValue={userType || undefined}>
                <SelectTrigger className="w-[180px] mb-4">
                    <SelectValue placeholder="Filter by user type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All Users</SelectItem>
                    <SelectItem value="ADMIN">Admins</SelectItem>
                    <SelectItem value="PARENT">Parents/Sponsors</SelectItem>
                </SelectContent>
            </Select>

            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-center">User Type</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>{user.email}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span className={`bg-${user.userType === 'ADMIN' ? 'purple' : 'green'}-200 text-${user.userType === 'ADMIN' ? 'purple' : 'green'}-600 py-1 px-3 rounded-full text-xs`}>
                                        {user.userType}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <Link href={`/admin/users/${user.id}`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        variant={page === currentPage ? 'default' : 'outline'}
                        onClick={() => router.push(`/admin/users?page=${page}&search=${search || ''}&userType=${userType || ''}`)}
                    >
                        {page}
                    </Button>
                ))}
            </div>
        </div>
    );
}