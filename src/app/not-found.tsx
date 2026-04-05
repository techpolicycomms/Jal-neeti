import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-4 text-lg text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
