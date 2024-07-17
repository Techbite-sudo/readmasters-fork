import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { EditBookForm } from '@/components/forms/EditBookForm';
import { DeleteBookButton } from '@/components/DeleteBookButton';

export default async function EditBookPage({ params }: { params: { id: string } }) {
    const book = await prisma.book.findUnique({
        where: { id: params.id },
    });

    if (!book) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit Book: {book.title}</h1>
            <EditBookForm book={{
                id: book.id,
                title: book.title,
                author: book.author,
                genre: book.genre,
                description: book.description ?? '',
                availableCopies: book.availableCopies
            }} />
            <div className="mt-8">
                <DeleteBookButton bookId={book.id} />
            </div>
        </div>
    );
}