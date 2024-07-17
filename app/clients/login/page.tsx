"use client";

import { onLoginFormAction } from "@/data-mutations/auth/login-actions";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/ui/button-submit";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import Image from "next/image";
import WingiLogo from "../../../public/wingi.png";

function LoginForm() {
	const [formState, formAction] = useFormState(onLoginFormAction, {});

	if (formState.success === true) {
		redirect("/admin");
	}

	return (
		<form action={formAction}>
			<CardContent className="grid gap-4">
				<InputError message={formState.formError} />
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						name="username"
						type="email"
						placeholder="m@example.com"
						required
					/>
					<InputError message={formState?.fieldErrors?.username} />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password">Password</Label>
					<Input id="password" type="password" name="password" required />
					<InputError message={formState?.fieldErrors?.password} />
				</div>
			</CardContent>
			<CardFooter>
				<SubmitButton className="w-full gap-4">Sign In</SubmitButton>
			</CardFooter>
		</form>
	);
}

export default function LoginPage() {
	return (
		<div className="bg-[#b8f8cd] flex w-dvw h-dvh justify-center items-center">
			<Card className="w-[400px] h-[auto]">
				<Image
					src={WingiLogo}
					width={500}
					height={500}
					alt="Logo"
					className="w-40 mx-auto my-10"
				/>
				<CardHeader>
					<CardTitle className="text-2xl">Client Area Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account.
					</CardDescription>
				</CardHeader>
				<LoginForm />
			</Card>
		</div>
	);
}
