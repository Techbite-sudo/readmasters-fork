"use client";

import Link from 'next/link';
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

export function BookList({ books, currentPage, totalPages, search, sort }: {
    books: Array<{
        id: string | number;
        title: string;
        author: string;
        genre: string;
        availableCopies: number;
    }>;
    currentPage: number;
    totalPages: number;
    search?: string;
    sort?: string;
}) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/admin/books?page=1&search=${searchTerm}&sort=${sort || ''}`);
    };

    const handleSort = (value: string) => {
        router.push(`/admin/books?page=${currentPage}&search=${search || ''}&sort=${value}`);
    };

    return (
        <div>
            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search books..."
                    className="flex-grow"
                />
                <Button type="submit">Search</Button>
            </form>

            <Select onValueChange={handleSort} defaultValue={sort}>
                <SelectTrigger className="w-[180px] mb-4">
                    <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="genre">Genre</SelectItem>
                </SelectContent>
            </Select>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book.id} className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                        <p className="mb-2">Author: {book.author}</p>
                        <p className="mb-2">Genre: {book.genre}</p>
                        <p className="mb-4">Available Copies: {book.availableCopies}</p>
                        <Link href={`/admin/books/${book.id}`} className="text-blue-600 hover:underline">
                            Edit
                        </Link>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        variant={page === currentPage ? 'default' : 'outline'}
                        onClick={() => router.push(`/admin/books?page=${page}&search=${search || ''}&sort=${sort || ''}`)}
                    >
                        {page}
                    </Button>
                ))}
            </div>
        </div>
    );
}