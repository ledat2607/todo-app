import { useState } from "react";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock, PersonStanding } from "lucide-react";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { formSignUpSchema } from "../schema";
import { userRegister } from "../api/user-register";


export const SignUpCard = () => {
  const { mutate } = userRegister();

  const form = useForm<z.infer<typeof formSignUpSchema>>({
    resolver: zodResolver(formSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const handleSubmitSignUp = (values: z.infer<typeof formSignUpSchema>) => {
    mutate({ json: values });
  };


  return (
    <Card className="w-full h-full md:w-[420px] shadow-lg rounded-2xl">
      <CardHeader className="flex items-center justify-center text-center p-6">
        <CardTitle className="text-2xl font-semibold text-primary">
          Welcome 👋
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Sign up to login to your workspace
        </p>
      </CardHeader>

      <div className="px-6">
        <DottedSeparator />
      </div>

      <CardContent className="p-6">
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(handleSubmitSignUp)}
          >
            {/* Email Input */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                      <Input
                        type="email"
                        placeholder="Enter email address..."
                        {...field}
                        className="pl-10" // chừa khoảng trống cho icon
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <PersonStanding className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                      <Input
                        type="text"
                        placeholder="Enter your name..."
                        {...field}
                        className="pl-10" // chừa khoảng trống cho icon
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Input */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => {
                const [showPassword, setShowPassword] = useState(false);

                return (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        {/* Icon bên trái */}
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />

                        {/* Input */}
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password..."
                          {...field}
                          className="pl-10 pr-10"
                        />

                        {/* Nút hiện/ẩn mật khẩu */}
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          onClick={() => setShowPassword((prev) => !prev)}
                          tabIndex={-1} // tránh focus khi tab
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* Confirm Password Input */}
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => {
                const [showConfirmPassword, setShowConfirmPassword] =
                  useState(false);

                return (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        {/* Icon bên trái */}
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />

                        {/* Input */}
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password..."
                          {...field}
                          className="pl-10 pr-10"
                        />

                        {/* Nút hiện/ẩn mật khẩu */}
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          tabIndex={-1} // tránh focus khi tab
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* Submit Button */}
            <Button
              disabled={false}
              size="lg"
              className="w-full rounded-xl transition-all duration-200 hover:scale-[1.02]"
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>
      <p className="pt-2 ml-6 text-muted-foreground font-semibold text-balance">
        Already have an account ?
        <Link href={"/sign-in"} className="text-blue-700">
          Sign in
        </Link>
      </p>
      <div className=" font-semibold text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 p-4">
        By clicking countinue, you agree to our <a href="#">Term of Service</a>{" "}
        and <a>Privacy Policy</a>
      </div>
    </Card>
  );
};
