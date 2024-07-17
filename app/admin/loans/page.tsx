import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils/date';

export default async function LoanHistoryPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = Number(searchParams.page) || 1;
    const limit = 20;

    const loans = await prisma.bookLoan.findMany({
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { borrowedAt: 'desc' },
        include: {
            book: true,
            user: true,
        },
    });

    const totalLoans = await prisma.bookLoan.count();
    const totalPages = Math.ceil(totalLoans / limit);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Loan History</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Book Title</th>
                        <th className="py-2 px-4 border-b">User</th>
                        <th className="py-2 px-4 border-b">Borrowed At</th>
                        <th className="py-2 px-4 border-b">Returned At</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan.id}>
                            <td className="py-2 px-4 border-b">{loan.book.title}</td>
                            <td className="py-2 px-4 border-b">{loan.user.name}</td>
                            <td className="py-2 px-4 border-b">{formatDate(loan.borrowedAt)}</td>
                            <td className="py-2 px-4 border-b">
                                {loan.returnedAt ? formatDate(loan.returnedAt) : 'Not returned'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <a
                        key={pageNum}
                        href={`/admin/loans?page=${pageNum}`}
                        className={`px-4 py-2 border rounded ${pageNum === page ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    >
                        {pageNum}
                    </a>
                ))}        </div>
        </div >
    );
}