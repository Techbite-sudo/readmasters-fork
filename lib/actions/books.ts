"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/actions/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function borrowBook(formData: FormData) {
	const bookId = formData.get("bookId") as string;
	const user = await getCurrentUser();

	if (!user) {
		return { error: "User not authenticated" };
	}

	try {
		const book = await prisma.book.findUnique({ where: { id: bookId } });
		if (!book) {
			return { error: "Book not found" };
		}

		if (book.availableCopies < 1) {
			return { error: "No copies available" };
		}

		await prisma.$transaction([
			prisma.book.update({
				where: { id: bookId },
				data: { availableCopies: { decrement: 1 } },
			}),
			prisma.bookLoan.create({
				data: {
					bookId: bookId,
					userId: user.id,
					dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
					childId: "", // Changed from null to undefined
				},
			}),
		]);

		revalidatePath("/dashboard/books");
		return { success: "Book borrowed successfully" };
	} catch (error) {
		console.error("Error borrowing book:", error);
		return { error: "Failed to borrow book" };
	}
}

const addBookSchema = z.object({
	title: z.string().min(1),
	author: z.string().min(1),
	genre: z.string().min(1),
	description: z.string().min(1),
	availableCopies: z.number().min(0),
});

export async function addBook(data: z.infer<typeof addBookSchema>) {
	const validatedFields = addBookSchema.safeParse(data);

	if (!validatedFields.success) {
		return { error: "Invalid input" };
	}

	try {
		await prisma.book.create({
			data: validatedFields.data,
		});
		revalidatePath("/admin/books");
		return { success: "Book added successfully" };
	} catch (error) {
		console.error("Error adding book:", error);
		return { error: "Failed to add book" };
	}
}

const updateBookSchema = z.object({
	id: z.string(),
	title: z.string().min(1),
	author: z.string().min(1),
	genre: z.string().min(1),
	description: z.string().min(1),
	availableCopies: z.number().min(0),
});

export async function updateBook(data: z.infer<typeof updateBookSchema>) {
	const validatedFields = updateBookSchema.safeParse(data);

	if (!validatedFields.success) {
		return { error: "Invalid input" };
	}

	const { id, ...updateData } = validatedFields.data;

	try {
		await prisma.book.update({
			where: { id },
			data: updateData,
		});
		revalidatePath(`/admin/books/${id}`);
		revalidatePath("/admin/books");
		return { success: "Book updated successfully" };
	} catch (error) {
		console.error("Error updating book:", error);
		return { error: "Failed to update book" };
	}
}

export async function deleteBook(id: string) {
	try {
		await prisma.book.delete({
			where: { id },
		});
		revalidatePath("/admin/books");
		return { success: "Book deleted successfully" };
	} catch (error) {
		console.error("Error deleting book:", error);
		return { error: "Failed to delete book" };
	}
}
