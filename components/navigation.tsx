"use client";

import { cn } from "@/lib/utils";
import { SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

import { usePathname } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const routes = [
  { label: "Home", href: "", icon: GoHome, activeIcon: GoHomeFill },
  {
    label: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UserIcon,
    activeIcon: UserIcon,
  },
];

export const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathName = usePathname();
  return (
    <ul className="flex flex-col">
      {routes.map((route) => {
        const fullHref = `/workspaces/${workspaceId}${route.href}`;
        const isActive = pathName === fullHref;
        const Icon = isActive ? route.activeIcon : route.icon;
        return (
          <Link key={route.href} href={fullHref} className="mb-4">
            <div
              className={cn(
                "relative flex items-center gap-2.5 p-2.5 rounded-md font-medium overflow-hidden group",
                isActive && "bg-white shadow-2xl text-primary"
              )}
            >
              {/* Border chạy màu */}
              <span
                className={cn(
                  "absolute inset-0 rounded-md p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:200%_200%] opacity-0 group-hover:opacity-100 group-hover:animate-border-spin",
                  isActive && "opacity-100 animate-border-spin"
                )}
              />

              {/* Nền trắng nằm dưới content */}
              <span className="absolute inset-[2px] bg-white rounded-md z-0" />

              {/* Icon & Text nằm trên cùng */}
              <Icon
                className={cn(
                  "relative z-10 size-5",
                  isActive ? "text-primary" : "text-neutral-700"
                )}
              />
              <span className="relative z-10">{route.label}</span>
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
