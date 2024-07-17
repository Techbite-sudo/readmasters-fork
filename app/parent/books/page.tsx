import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function BooksPage() {
    const books = await prisma.book.findMany({
        take: 20,
        orderBy: { title: 'asc' },
    });

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Book Catalogue</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book.id} className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                        <p className="mb-2">Author: {book.author}</p>
                        <p className="mb-4">Genre: {book.genre}</p>
                        <Link href={`/dashboard/books/${book.id}`} className="text-blue-600 hover:underline">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}