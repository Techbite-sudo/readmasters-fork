import { getCurrentUser } from '@/lib/actions/auth';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
    const user = await getCurrentUser();
    if (!user) {
        return <div>User not found</div>;
    }
    const childrenCount = await prisma.children.count({ where: { parentId: user.id } });
    const borrowedBooksCount = await prisma.bookLoan.count({
        where: {
            child: { parentId: user.id },
            returnedAt: null
        }
    });

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">My Children</h2>
                    <p className="text-3xl font-bold">{childrenCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Books Currently Borrowed</h2>
                    <p className="text-3xl font-bold">{borrowedBooksCount}</p>
                </div>
            </div>
        </div>
    );
}