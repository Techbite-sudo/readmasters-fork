import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, token: string) {
	const transporter = nodemailer.createTransport({
		// Configure your email service here
		host: process.env.EMAIL_SERVER_HOST,
		port: Number(process.env.EMAIL_SERVER_PORT),
		auth: {
			user: process.env.EMAIL_SERVER_USER,
			pass: process.env.EMAIL_SERVER_PASSWORD,
		},
	});

	const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

	await transporter.sendMail({
		from: process.env.EMAIL_FROM,
		to: email,
		subject: "Verify your email for Read Masters",
		html: `Please click this link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
	});
}

