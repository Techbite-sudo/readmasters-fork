import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
	const bookStats = await prisma.bookLoan.groupBy({
		by: ["bookId"],
		_count: {
			bookId: true, // Count the number of loans for each bookId
		},
		orderBy: {
			_count: {
				bookId: "desc", // Order by the count of bookId in descending order
			},
		},
		take: 5,
	});

	const bookIds = bookStats.map(stat => stat.bookId);
	const books = await prisma.book.findMany({
		where: {
			id: {
				in: bookIds,
			},
		},
	});

	const labels = books.map(book => book.title);
	const values = bookStats.map(stat => stat._count.bookId ?? 0); // Access the count of bookId
	return NextResponse.json({ labels, values });
}
