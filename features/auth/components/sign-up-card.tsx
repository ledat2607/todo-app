import { useState } from "react";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock, PersonStandingIcon } from "lucide-react";
import Link from "next/link";

export const SignUpCard = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <form className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              id="email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              disabled={false}
              className="pl-10 pr-4 py-2"
            />
          </div>
          <div className="relative">
            <PersonStandingIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              id="name"
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name...."
              disabled={false}
              className="pl-10 pr-4 py-2"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              id="password"
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPasword(e.target.value)}
              placeholder="Enter password..."
              disabled={false}
              minLength={8}
              maxLength={256}
              className="pl-10 pr-10 py-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/*Confirm password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              id="confirmPassword"
              required
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPasword(e.target.value)}
              placeholder="Enter confirm password..."
              disabled={false}
              minLength={8}
              maxLength={256}
              className="pl-10 pr-10 py-2"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {/* Submit Button */}
          <Button
            disabled={false}
            size="lg"
            className="w-full rounded-xl transition-all duration-200 hover:scale-[1.02]"
          >
            Sign Up
          </Button>
        </form>
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
