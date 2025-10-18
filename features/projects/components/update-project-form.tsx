"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  ImageIcon,
  Loader2,
  PlusCircleIcon,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { updateProjectSchema } from "../schema";
import { useUpdateProject } from "../api/use-update-project";
import { Project } from "../type";
import { useDeleteProject } from "../api/use-delete-project";

interface UpdateProjectProps {
  onCancel?: () => void;
  initialValues: Project;
}

export const UpdateProjectForm = ({
  onCancel,
  initialValues,
}: UpdateProjectProps) => {
  const { mutate, isPending } = useUpdateProject();

  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete workspace",
    "This action cannot be undone",
    "destructive"
  );

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    deleteProject(
      { param: { projectId: initialValues.$id } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${initialValues.workspaceId}`);
        },
      }
    );
  };

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof updateProjectSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : undefined,
    };
    mutate(
      { form: finalValues, param: { projectId: initialValues.$id } },
      {
        onSuccess: ({ data }) => {
          form.reset();
          window.location.reload();
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

  return (
    <div className="flex flex-col gap-y-4">
      {" "}
      <DeleteDialog />
      {/*Update information */}
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7">
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={
              onCancel
                ? onCancel
                : () =>
                    router.push(
                      `/workspaces/${initialValues.$id}/projects/${initialValues.$id}`
                    )
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
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your project name....."
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
              variant={"destructive"}
              className="mt-4"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Delete project"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
