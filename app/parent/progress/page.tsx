import { getCurrentUser } from '@/lib/actions/auth';
import { prisma } from '@/lib/prisma';
import { ProgressChart } from '@/components/ProgressChart';
import { AddProgressForm } from '@/components/forms/AddProgressForm';

export default async function ProgressPage() {
    const user = await getCurrentUser();
    if (!user) {
        // Handle the case where user is null, e.g., redirect to login page or show an error message
        return <div>Please log in to view this page.</div>;
    }
    const children = await prisma.children.findMany({
        where: { parentId: user.id },
        include: {
            readingProgress: {
                include: { book: true },
                orderBy: { startDate: 'desc' },
                take: 5,
            },
        },
    });

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Reading Progress</h1>
            {children.map((child) => (
                <div key={child.id} className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">{child.name}'s Progress</h2>
                    <ProgressChart progress={child.readingProgress} />
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Recent Books</h3>
                        <ul>
                            {child.readingProgress.map((progress) => (
                                <li key={progress.id} className="mb-2">
                                    {progress.book.title} - {progress.pagesRead} pages read
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Add Progress</h3>
                        <AddProgressForm childId={child.id} />
                    </div>
                </div>
            ))}
        </div>
    );
}