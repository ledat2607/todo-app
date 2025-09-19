'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useCurrentUser } from "../api/use-current";
import { Loader, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DottedSeparator } from "@/components/dotted-separator";
import { useLogout } from "../api/use-logout";

export const UserButton = () => {
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: logout } = useLogout();

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300 animate-pulse">
        <Loader className="size-4 animate-spin" />
      </div>
    );
  }
  if (!user) {
    return null;
  }

  const { name, email } = user;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-80 transition cursor-pointer border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-600">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col justify-center gap-2 px-3 py-1">
          <div className="flex items-center gap-2">
            <Avatar className="size-10 hover:opacity-80 transition cursor-pointer border border-neutral-300">
              <AvatarFallback className="bg-neutral-200 font-medium text-neutral-600">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-md">{name || "User"}</p>
              <p className="text-[12px] text-muted-foreground font-semibold">
                {email}
              </p>
            </div>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          onClick={() => logout()}
          className="h-10 items-center text-amber-700 font-medium cursor-pointer hover:!bg-rose-600 hover:text-white"
        >
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};