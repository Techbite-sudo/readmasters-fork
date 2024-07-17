import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { EditUserForm } from '@/components/forms/EditUserForm';
import { DeleteUserButton } from '@/components/DeleteUserButton';

export default async function EditUserPage({ params }: { params: { id: string } }) {
    const user = await prisma.users.findUnique({
        where: { id: params.id },
    });

    if (!user) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit User: {user.name}</h1>
            <EditUserForm user={user} />
            <div className="mt-8">
                <DeleteUserButton userId={user.id} />
            </div>
        </div>
    );
}