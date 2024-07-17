import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; 

const prisma = new PrismaClient();

async function main() {
	const adminRole = await prisma.role.upsert({
		where: { name: "ADMIN" },
		update: {},
		create: {
			name: "ADMIN",
			permissions: [
				"user.read",
				"user.create",
				"user.update",
				"user.delete",
				"book.read",
				"book.create",
				"book.update",
				"book.delete",
			],
		},
	});

	const hashedPassword = await bcrypt.hash("Admin1234", 12);

	const admin = await prisma.users.upsert({
		where: { email: "admin@readmasters.com" },
		update: {},
		create: {
			name: "Admin User",
			email: "admin@readmasters.com",
			passwordHash: hashedPassword,
			userType: "ADMIN",
			emailVerified: new Date(),
			roleId: adminRole.id,
		},
	});

	console.log({ adminRole, admin });
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
