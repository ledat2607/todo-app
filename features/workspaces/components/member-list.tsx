"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { DottedSeparator } from "@/components/dotted-separator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { Fragment } from "react";
import { MemberImage } from "@/features/members/components/member-avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { EnumTypeMember } from "@/features/members/types";
import { useConfirm } from "@/hooks/use-confirm";
import { redirect } from "next/navigation";

interface MemberListProps {
  userId?: string;
}

export const MemberList = ({ userId }: MemberListProps) => {
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetMembers({ workspaceId });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-sm text-muted-foreground">Loading members...</p>
      </div>
    );
  }

  if (data === undefined) {
    redirect("/workspaces/create");
  }

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This action cannot be undone.",
    "destructive"
  );

  const { mutate: deleteMember, isPending: deletingMember } = useDeleteMember();
  const { mutate: updateMember, isPending: updatingMember } = useUpdateMember();

  const handleUpdate = (memberId: string, role: EnumTypeMember) => {
    updateMember(
      {
        json: { role },
        param: { memberId },
      },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  };

  const handleDelete = async (memberId: string) => {
    const oke = await confirm();
    if (!oke) return;

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  };
  return (
    <Card className="w-full h-full border-none shadow-none">
      <ConfirmDialog />
      <CardHeader className="flex flex-row items-center gap-x-4">
        <Button asChild size={"sm"} variant={"outline"}>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members list</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        {data?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className="flex items-center gap-3">
              <MemberImage
                className="size-10"
                fallbackClassName="text-lg"
                name={member.name}
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  {member.name} -{" "}
                  <div className="flex gap-4">
                    <Badge
                      variant={
                        member.role === "ADMIN" ? "destructive" : "outline"
                      }
                    >
                      {member.role ?? "MEMBER"}
                    </Badge>
                    <Badge
                      className={userId === member.userId ? "block" : "hidden"}
                    >
                      {userId === member.userId && "You"}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-balance text-muted-foreground">
                  {member.email}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="ml-auto" variant={"outline"} size={"icon"}>
                    <MoreVerticalIcon className="text-xs text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    disabled={member.role === EnumTypeMember.MEMBER}
                    className="font-medium cursor-pointer"
                    onClick={() =>
                      handleUpdate(member.$id, EnumTypeMember.ADMIN)
                    }
                  >
                    {updatingMember ? "Updating..." : `Set as Administrator`}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={member.role === "MEMBER"}
                    className="font-medium cursor-pointer"
                    onClick={() =>
                      handleUpdate(member.$id, EnumTypeMember.MEMBER)
                    }
                  >
                    {updatingMember ? "Updating..." : `Set as Member`}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={member.role === EnumTypeMember.MEMBER}
                    className="font-medium cursor-pointer"
                    onClick={() => handleDelete(member.$id)}
                  >
                    {deletingMember ? "Deleting..." : ` Remove ${member.name}`}
                  </DropdownMenuItem>
                  {member.role === EnumTypeMember.MEMBER && (
                    <DropdownMenuItem
                      onClick={() => handleDelete(member.$id)}
                      className="cursor-pointer font-medium"
                    >
                      Leave project
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < data.documents.length - 1 && (
              <Separator className="my-4" />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
};
