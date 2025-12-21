import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

import { Cairo, Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
    <html className={`${inter.className} ${cairo.className}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
