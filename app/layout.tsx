import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIT - Muszlim Ifjúság Társaság",
  description:
    "MIT is a student-run community built to support Muslim students in Hungary, help them connect, grow, and feel at home.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
