import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { borrowBook } from '@/lib/actions/books';

export default async function BookDetailPage({ params }: { params: { id: string } }) {
    const book = await prisma.book.findUnique({
        where: { id: params.id },
    });

    if (!book) {
        notFound();
    }
    
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
            <p className="mb-2">Author: {book.author}</p>
            <p className="mb-2">Genre: {book.genre}</p>
            <p className="mb-4">{book.description}</p>
            <form action={borrowBook}>
                <input type="hidden" name="bookId" value={book.id} />
                <Button type="submit">Borrow This Book</Button>
            </form>
        </div>
    );
}