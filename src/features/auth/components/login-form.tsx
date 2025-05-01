"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signinSchema, SigninInput } from "../schemas/signin-schema";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GithubAuthButton } from "./github-auth";
import { authClient, getAuthErrorMessage } from "@/lib/auth-client";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<SigninInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signinSchema),
  });

  async function onSubmit(data: SigninInput) {
    const { error } = await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: () => {
          setIsLoading(false);
          if (error?.code) {
            toast(getAuthErrorMessage(error.code, "en"));
            return;
          }
          toast("Something went wrong");
        },
      },
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
        <CardDescription>Sign in to your TechSpace account</CardDescription>
      </CardHeader>
      <Form {...form}>
        <CardContent className="space-y-4">
          <GithubAuthButton />

          <div className="flex items-center">
            <Separator className="flex-1" />
            <span className="text-muted-foreground mx-2 text-xs">OR</span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-muted-foreground text-sm">
            {"Don't have an account? "}
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Create account
            </Link>
          </p>
        </CardFooter>
      </Form>
    </Card>
  );
}
