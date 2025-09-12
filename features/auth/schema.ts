import z from "zod";

export const formLoginSchema = z.object({
  email: z.string().trim().min(1, "Required").email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const formSignUpSchema = z
  .object({
    email: z.string().trim().min(1, "Required").email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    name: z.string().min(1, "Name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
