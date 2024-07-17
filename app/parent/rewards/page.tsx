import { getCurrentUser } from '@/lib/actions/auth';
import { prisma } from '@/lib/prisma';

export default async function RewardsPage() {
    const user = await getCurrentUser();
    if (!user) {
        return <div>User not found</div>;
    }
    const children = await prisma.children.findMany({
        where: { parentId: user.id },
        select: { id: true, name: true, points: true },
    });

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Rewards</h1>
            {children.map((child) => (
                <div key={child.id} className="mb-8 p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">{child.name}'s Rewards</h2>
                    <p className="text-3xl font-bold mb-4">{child.points} Points</p>
                    <h3 className="text-lg font-semibold mb-2">Available Rewards:</h3>
                    <ul className="list-disc pl-5">
                        <li>50 points: Choose a new book</li>
                        <li>100 points: Reading light</li>
                        <li>200 points: Kindle e-reader</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}