"use client";
import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="lg:flex hidden flex-col">
        <h1 className="text-3xl font-semibold">Home</h1>
        <p className="text-neutral-600 text-balance font-semibold text-xs">
          Monitor all of your project and task here
        </p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
