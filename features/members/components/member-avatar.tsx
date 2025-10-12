import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MemberImageProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
}

export const MemberImage = ({
  fallbackClassName,
  name,
  className,
}: MemberImageProps) => {
  return (
    <Avatar
      className={cn("size-10 transition border border-neutral-300", className)}
    >
      <AvatarFallback
        className={cn(
          "bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center",
          fallbackClassName
        )}
      >
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
