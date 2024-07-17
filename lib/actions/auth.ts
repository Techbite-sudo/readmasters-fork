"use server";

import { prisma } from "@/lib/prisma";
import { LoginInput, loginSchema, registerSchema, type RegisterInput } from "@/lib/schemas/auth";
import { cookies } from "next/headers";
import { hash, compare } from "bcryptjs";
import { sendVerificationEmail } from "@/lib/utils/email";
import { v4 as uuidv4 } from "uuid";
import { SignJWT, jwtVerify } from "jose";

export async function register(data: RegisterInput) {
	const validatedFields = registerSchema.safeParse(data);

	if (!validatedFields.success) {
		return { error: "Invalid input" };
	}

	const { name, email, phone, password } = validatedFields.data;

	const existingUser = await prisma.users.findUnique({
		where: { email },
	});

	if (existingUser) {
		return { error: "User already exists" };
	}

	const hashedPassword = await hash(password, 12);

	const verificationToken = uuidv4();

	const user = await prisma.users.create({
		data: {
			name,
			email,
			phoneNumber: phone,
			passwordHash: hashedPassword,
			userType: "PARENT",
			verificationToken,
		},
	});

	await sendVerificationEmail(email, verificationToken);

	return {
		success: "User created successfully. Please check your email to verify your account.",
	};
}

export async function verifyEmail(token: string) {
	const user = await prisma.users.findUnique({
		where: { verificationToken: token },
	});

	if (!user) {
		return { error: "Invalid verification token" };
	}

	await prisma.users.update({
		where: { id: user.id },
		data: {
			emailVerified: new Date(),
			verificationToken: null,
		},
	});

	return { success: "Email verified successfully" };
}

export async function login(data: LoginInput) {
	const validatedFields = loginSchema.safeParse(data);

	if (!validatedFields.success) {
		return { error: "Invalid input" };
	}

	const { email, password } = validatedFields.data;

	const user = await prisma.users.findUnique({
		where: { email },
		include: { role: true },
	});

	if (!user || !user.emailVerified) {
		return { error: "Invalid credentials or email not verified" };
	}

	const passwordValid = await compare(password, user.passwordHash);

	if (!passwordValid) {
		return { error: "Invalid credentials" };
	}

	const token = await new SignJWT({
		userId: user.id,
		role: user.role?.name,
	})
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime("1h")
		.sign(new TextEncoder().encode(process.env.JWT_SECRET));

	cookies().set("auth-token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 3600,
		path: "/",
	});

	return { success: "Logged in successfully", role: user.role?.name };
}

export async function logout() {
	cookies().delete("auth-token");
	return { success: "Logged out successfully" };
}

export async function getCurrentUser() {
	const token = cookies().get("auth-token")?.value;

	if (!token) {
		return null;
	}

	try {
		const { payload } = await jwtVerify(
			token,
			new TextEncoder().encode(process.env.JWT_SECRET)
		);

		const userId = payload.userId as string;

		const user = await prisma.users.findUnique({
			where: { id: userId },
			select: {
				id: true,
				name: true,
				email: true,
				userType: true,
				phoneNumber: true,
				address: true,
				dateOfBirth: true,
				profileImageUrl: true,
				bio: true,
				emailVerified: true,
				role: {
					select: {
						name: true,
						permissions: true,
					},
				},
			},
		});

		return user;
	} catch (error) {
		console.error("Error verifying token:", error);
		return null;
	}
}
