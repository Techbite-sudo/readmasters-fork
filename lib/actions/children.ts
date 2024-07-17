"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/actions/auth";
import { z } from "zod";

const addChildSchema = z.object({
	name: z.string().min(2),
	age: z.number().min(1).max(18),
	grade: z.string().min(1),
	school: z.string().min(1),
});

export async function addChild(data: z.infer<typeof addChildSchema>) {
	const validatedFields = addChildSchema.safeParse(data);

	if (!validatedFields.success) {
		return { error: "Invalid input" };
	}

	const user = await getCurrentUser();

	if (!user) {
		return { error: "User not authenticated" };
	}

	try {
		await prisma.children.create({
			data: {
				...validatedFields.data,
				parentId: user.id,
			},
		});
		return { success: "Child added successfully" };
	} catch (error) {
		console.error("Error adding child:", error);
		return { error: "Failed to add child" };
	}
}
