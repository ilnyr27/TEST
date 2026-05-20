"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Main layout error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="flex flex-col items-center gap-2">
          <AlertTriangle className="h-10 w-10 text-destructive" />
          <CardTitle>Something went wrong</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {error.message || "An unexpected error occurred."}
          </CardDescription>
          {error.digest && (
            <p className="mt-1 text-xs text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
        </CardHeader>
        <CardFooter className="flex justify-center gap-3">
          <Button variant="outline" onClick={reset}>
            Try again
          </Button>
          <Link href="/dashboard">
            <Button>Go to dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
