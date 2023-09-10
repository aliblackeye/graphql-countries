import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Junior Frontend Assignment",
	description: "This is a junior frontend assignment for a job application.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClientLayout>
			<html lang="en">
				<body className={inter.className}>{children}</body>
			</html>
		</ClientLayout>
	);
}
