"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const addUserSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(8),
	userType: z.enum(["ADMIN", "PARENT"]),
});

export async function addUser(data: z.infer<typeof addUserSchema>) {
	const validatedFields = addUserSchema.safeParse(data);

	if (!validatedFields.success) {
		return { error: "Invalid input" };
	}

	const { name, email, password, userType } = validatedFields.data;

	try {
		const existingUser = await prisma.users.findUnique({
			where: { email },
		});

		if (existingUser) {
			return { error: "User with this email already exists" };
		}

		const hashedPassword = await hash(password, 12);

		await prisma.users.create({
			data: {
				name,
				email,
				passwordHash: hashedPassword,
				userType,
                emailVerified: new Date(),
			},
		});

		revalidatePath("/admin/users");
		return { success: "User added successfully" };
	} catch (error) {
		console.error("Error adding user:", error);
		return { error: "Failed to add user" };
	}
}

const updateUserSchema = z.object({
	id: z.string(),
	name: z.string().min(2),
	email: z.string().email(),
	userType: z.enum(["ADMIN", "PARENT"]),
});

export async function updateUser(data: z.infer<typeof updateUserSchema>) {
	const validatedFields = updateUserSchema.safeParse(data);

	if (!validatedFields.success) {
		return { error: "Invalid input" };
	}

	const { id, name, email, userType } = validatedFields.data;

	try {
		await prisma.users.update({
			where: { id },
			data: { name, email, userType },
		});

		revalidatePath("/admin/users");
		revalidatePath(`/admin/users/${id}`);
		return { success: "User updated successfully" };
	} catch (error) {
		console.error("Error updating user:", error);
		return { error: "Failed to update user" };
	}
}

export async function deleteUser(id: string) {
	try {
		await prisma.users.delete({
			where: { id },
		});
		revalidatePath("/admin/users");
		return { success: "User deleted successfully" };
	} catch (error) {
		console.error("Error deleting user:", error);
		return { error: "Failed to delete user" };
	}
}
