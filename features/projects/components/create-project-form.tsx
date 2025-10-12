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
import { ImageIcon, Loader2, PlusCircleIcon, Trash } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useCreateProject } from "../api/use-create-project";
import { createProjectSchema } from "../schema";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface CreateProjectFormProps {
  onCancel?: () => void;
}

export const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {

  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useCreateProject();


  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      image: "",
      workspaceId: workspaceId || "",
    },
  });
  const onSubmit = (values: z.infer<typeof createProjectSchema>) => {
    const finalValues = {
      ...values,
      workspaceId,
      image: values.image instanceof File ? values.image : "",
    };
    mutate(
      { form: finalValues },
      {
        onSuccess: ({ data }) => {
          form.reset();
          onCancel?.();
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
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Create new project</CardTitle>
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
                  <FormLabel>Project</FormLabel>
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
                            field.value instanceof File
                              ? URL.createObjectURL(field.value)
                              : field.value
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
                      <p className="text-sm">Project Icon</p>
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
                    Creating....
                  </>
                ) : (
                  <>
                    <PlusCircleIcon />
                    Create new project
                  </>
                )}
              </Button>
              <Button
                disabled={isPending}
                type="button"
                variant={"destructive"}
                className={cn(!onCancel && "invisible text-white")}
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
  );
};
