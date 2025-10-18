"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 text-red-600">
      <AlertTriangleIcon className="text-sm text-muted-foreground" />
      <p>Something went wrong</p>
      <Button variant={"outline"}>
        <Link href={"/"}>Back to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
