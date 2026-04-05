"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          An unexpected error occurred. Please try again.
        </p>
        <div className="mt-8">
          <Button onClick={() => reset()}>Try Again</Button>
        </div>
      </div>
    </section>
  );
}
