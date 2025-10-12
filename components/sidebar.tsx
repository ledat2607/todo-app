"use client";
import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./dotted-separator";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspaces-switcher";
import Projects from "./projects";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link
        href={"/"}
        className="flex items-center gap-2 font-bold text-2xl mb-8"
      >
        <Image src={"/logo.svg"} alt="Logo" width={58} height={48} />
        Task <p className="text-primary">Manager</p>
      </Link>
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  );
};
