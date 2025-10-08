"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WorkspaceImage } from "./workspace-avatar";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { Loader, Send, X } from "lucide-react";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
    image: string;
  };
}

export const JoinWoekspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const { mutate, isPending } = useJoinWorkspace();
  const router = useRouter();

 const onSubmit = () => {
   mutate(
     {
       param: {
         workspaceId,
         code: inviteCode,
       },
     },
     {
       onSuccess: ({ data }) => {
         router.push(`/workspaces/${data.$id}`);
       },
     }
   );
 };
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
        <CardDescription>
          You&apos;vs been invited to join <strong>{initialValues.name}</strong>
        </CardDescription>
        <div className="mx-auto">
          <WorkspaceImage
            image={initialValues.image}
            name=""
            className="size-52"
          />
        </div>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex lg:flex-row flex-col gap-2 items-center justify-between">
          <Button
            className="w-full lg:w-fit"
            asChild
            type="button"
            variant={"destructive"}
          >
            <Link href={"/"} className="flex items-center">
              <X />
              Cancel
            </Link>
          </Button>
          <Button
            className="w-full lg:w-fit"
            type="button"
            size={"lg"}
            onClick={onSubmit}
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center">
                <Loader className="animate-spin" />
                Joining
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send />
                Join Workspace
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
