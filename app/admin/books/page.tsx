import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { AddBookForm } from '@/components/forms/AddBookForm';
import { BookList } from '@/components/BookList';

export default async function AdminBooksPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = Number(searchParams.page) || 1;
    const limit = 10;
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const sort = typeof searchParams.sort === 'string' ? searchParams.sort : undefined;

    const where = search
        ? {
            OR: [
                { title: { contains: search, mode: 'insensitive' as const } },
                { author: { contains: search, mode: 'insensitive' as const } },
                { genre: { contains: search, mode: 'insensitive' as const } },
            ],
        }
        : {};

    const books = await prisma.book.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: sort ? { [sort]: 'asc' } : { title: 'asc' },
    });

    const totalBooks = await prisma.book.count({ where });
    const totalPages = Math.ceil(totalBooks / limit);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Manage Books</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
                <AddBookForm />
            </div>
            <BookList
                books={books}
                currentPage={page}
                totalPages={totalPages}
                search={search}
                sort={sort}
            />
        </div>
    );
}