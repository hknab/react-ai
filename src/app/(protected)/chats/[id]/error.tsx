"use client";

import { buttonVariants } from "@/components/ui";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen w-full grid place-items-center">
      <h2 className="text-4xl mb-2">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className={buttonVariants({ variant: "secondary", size: "lg" })}
      >
        Try again
      </button>
    </div>
  );
}
