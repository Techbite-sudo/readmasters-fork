"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const addProgressSchema = z.object({
	childId: z.string(),
	bookId: z.string(),
	pagesRead: z.number().min(1),
});

export async function addProgress(data: z.infer<typeof addProgressSchema>) {
	const validatedFields = addProgressSchema.safeParse(data);

	if (!validatedFields.success) {
		return { error: "Invalid input" };
	}

	try {
		await prisma.$transaction(async prisma => {
			await prisma.readingProgress.create({
				data: validatedFields.data,
			});

			// Add points based on pages read (1 point per 10 pages)
			const pointsEarned = Math.floor(validatedFields.data.pagesRead / 10);
			await prisma.children.update({
				where: { id: validatedFields.data.childId },
				data: { points: { increment: pointsEarned } },
			});
		});

		revalidatePath("/dashboard/progress");
		return { success: "Progress added successfully" };
	} catch (error) {
		console.error("Error adding progress:", error);
		return { error: "Failed to add progress" };
	}
}
