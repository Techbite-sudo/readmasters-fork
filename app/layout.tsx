import "./globals.css";
import "../public/stack.css";

import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/shad-utils";
import { AlertDialogProvider } from "@/components/common-modals/alert-modal";

export const metadata: Metadata = {};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="overflow-hidden overflow-y-scroll">
			<title>Read Masters</title>
			<body
				className={cn(
					GeistSans.className,
					GeistMono.variable,
					"w-svw",
					"overflow-x-hidden"
				)}
			>
				<AlertDialogProvider>{children}</AlertDialogProvider>
				<Toaster />
			</body>
		</html>
	);
}
