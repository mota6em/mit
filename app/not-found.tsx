import { AuroraBackground } from "@/src/components/ui/aurora-background";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <AuroraBackground className="min-h-screen">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="flex flex-col items-center gap-8">
          <Image
            src="/imgs/hero/mit-logo-full.png"
            alt="MIT Logo"
            width={200}
            height={200}
            priority
          />
          <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 bg-clip-text text-transparent">
            404 - Page Not Found
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 text-center max-w-md">
            The page you are looking for does not exist
          </p>
          <Link
            href="/en"
            className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </AuroraBackground>
  );
}
