"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateWorkspaceSchema } from "../schemas";
import z from "zod";
import React, { useRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Copy,
  ImageIcon,
  Loader2,
  PlusCircleIcon,
  Trash,
} from "lucide-react";
import { useCreateWorkspace } from "../api/use-create-workspace";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";
import { useResetInviteCode } from "../api/use-reset-invite-code";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
  initialValues: Workspace;
}

export const UpdateWorkspaceForm = ({
  onCancel,
  initialValues,
}: CreateWorkspaceFormProps) => {
  const { mutate, isPending } = useUpdateWorkspace();

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: deleteWorkspace, isPending: deletePending } =
    useDeleteWorkspace();

  const { mutate: resetCode, isPending: resetCodePending } =
    useResetInviteCode();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete workspace",
    "This action cannot be undone",
    "destructive"
  );

   const [ResetDialog, confirmReset] = useConfirm(
     "Reset invite code",
     "This will invalidate the current invite link",
     "default"
   );



  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.image ?? undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : undefined,
    };
    mutate(
      { form: finalValues, param: { workspaceId: initialValues.$id } },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;

    deleteWorkspace(
      {
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

   const handleReset = async () => {
    const ok = await confirmReset();
    if (!ok) return;

    resetCode(
      {
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: () => {
          router.refresh();
        },
      }
    );
  };


  const fullLinkInvite = React.useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;
  }, [initialValues.$id, initialValues.inviteCode]);

  const handleCopy = async () => {
    if (!fullLinkInvite) return;
    await navigator.clipboard.writeText(fullLinkInvite);
    toast.success("Copied to clipboard!");
  };
  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <ResetDialog />
      {/*Update information */}
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7">
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={
              onCancel
                ? onCancel
                : () => router.push(`/workspaces/${initialValues.$id}`)
            }
          >
            <ArrowLeft /> Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your workspace name....."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="flex flex-col gap-y-2 mt-4">
                    <div className="flex items-center gap-x-5">
                      {field.value ? (
                        <div className="relative size-[72px] rounded-md overflow-hidden">
                          <Image
                            src={
                              typeof field.value === "string"
                                ? field.value
                                : URL.createObjectURL(field.value)
                            }
                            alt="Logo"
                            className="object-cover"
                            fill
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[37px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <p className="text-sm">Workspace Icon</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNJ, SVG or JPEG, max 1MB
                        </p>
                        <input
                          onChange={handleImageChange}
                          className="hidden"
                          accept=".jpg, .png, .svg, .jpeg"
                          type="file"
                          ref={inputRef}
                          disabled={isPending}
                        />
                        {field.value ? (
                          <Button
                            type="button"
                            disabled={isPending}
                            variant={"outline"}
                            size="sm"
                            className="w-fit mt-2"
                            onClick={() => inputRef?.current?.click()}
                          >
                            Change Image
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            disabled={isPending}
                            variant={"outline"}
                            size="sm"
                            className="w-fit mt-2"
                            onClick={() => inputRef?.current?.click()}
                          >
                            Upload Image
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              />
              <DottedSeparator className="my-6" />
              <div className="flex items-center justify-end gap-4">
                <Button disabled={isPending} type="submit">
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Updating....
                    </>
                  ) : (
                    <>
                      <PlusCircleIcon />
                      Update
                    </>
                  )}
                </Button>
                <Button
                  disabled={isPending}
                  type="button"
                  variant={"destructive"}
                  // className={cn(!oncancel && "invisible text-white")}
                  onClick={onCancel}
                >
                  <Trash />
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {/*Change invite code */}
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Invite members</h3>
            <p className="text-sm text-muted-foreground sca">
              Use the invite link to add new member to your workspace
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <div className="flex items-center justify-between w-full gap-2">
                  <Input
                    type="text"
                    readOnly
                    value={fullLinkInvite}
                    className="cursor-pointer"
                    onClick={handleCopy}
                  />
                  <Button onClick={handleCopy} variant={"outline"}>
                    <Copy />
                  </Button>
                </div>
              </div>
              <DottedSeparator className="my-7" />
              <Button
                className="ml-auto w-fit"
                size={"sm"}
                variant={"default"}
                type="button"
                onClick={handleReset}
              >
                Reset invite link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>{" "}
      {/*Delete zone */}
      <Card className="w-full h-full border-red-500 bg-red-100 shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground sca">
              Deleting a workspace is a irreverible and will remove all
              associated data
            </p>
            <Button
              type="button"
              size={"sm"}
              disabled={deletePending}
              variant={"destructive"}
              className="mt-4"
              onClick={handleDelete}
            >
              Delete workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
