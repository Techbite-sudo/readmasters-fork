import { prisma } from '@/lib/prisma';
import { UserList } from '@/components/UserList';
import { AddUserForm } from '@/components/forms/AddUserForm';

export default async function UsersPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = Number(searchParams.page) || 1;
    const limit = 10;
    const search = typeof searchParams.search === 'string' ? searchParams.search : '';
    const userType = typeof searchParams.userType === 'string' && searchParams.userType !== 'ALL'
        ? searchParams.userType
        : '';

    const where: any = {
        ...(search && {
            OR: [
                { name: { contains: search, mode: 'insensitive' as const } },
                { email: { contains: search, mode: 'insensitive' as const } },
            ],
        }),
        ...(userType && { userType }),
    };

    const users = await prisma.users.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            email: true,
            userType: true,
        },
    });

    const totalUsers = await prisma.users.count({ where });
    const totalPages = Math.ceil(totalUsers / limit);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                <AddUserForm />
            </div>
            <UserList
                users={users}
                currentPage={page}
                totalPages={totalPages}
                search={search}
                userType={userType}
            />
        </div>
    );
}