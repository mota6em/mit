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
    "Muslim Youth Association of Hungary (MIT) is a volunteer-driven organization dedicated to uniting and empowering Muslim youth across Hungary. We provide a space for learning, collaboration, and personal growth, where young Muslims can strengthen their faith and leadership skills. Rooted in the Islamic principles of sincerity, community, and excellence (ihsan), MIT strives to build a generation that serves both the Ummah and wider society with integrity and purpose.",
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
