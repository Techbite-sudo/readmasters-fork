import { getCurrentUser } from '@/lib/actions/auth';
import { prisma } from '@/lib/prisma';
import { AddChildForm } from '@/components/forms/AddChildForm';

export default async function ChildrenPage() {
    const user = await getCurrentUser();
    if (!user) {
        return <div>Please log in to view this page.</div>;
    }
    const children = await prisma.children.findMany({ where: { parentId: user.id } });

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Children</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {children.map((child) => (
                    <div key={child.id} className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">{child.name}</h2>
                        <p>Age: {child.age}</p>
                        <p>Grade: {child.grade}</p>
                        <p>School: {child.school}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Add a Child</h2>
                <AddChildForm />
            </div>
        </div>
    );
}