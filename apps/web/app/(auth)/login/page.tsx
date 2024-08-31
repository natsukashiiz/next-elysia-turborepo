"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ButtonLoading } from "@/components/button-loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2),
  password: z.string().min(4),
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "vv12",
      password: "1234",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await signIn("credentials", {
        redirect: false,
        name: values.name,
        password: values.password,
      });

      if (res?.error) {
        toast.error("Name or Password is incorrect");
        return;
      }

      toast.success("Signed in successfully");

      // TODO: fix router sometime not working
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl flex justify-center">
      <div className="flex flex-col items-center mt-[20%]">
        <Card className="w-[380px]">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Welcome back! Sign in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                // action={dispatch}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
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
                        <Input placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ButtonLoading
                  type="submit"
                  className="w-full"
                  loading={loading}
                >
                  Sign in
                </ButtonLoading>
                <Button
                  type="button"
                  variant={"secondary"}
                  className="w-full"
                  asChild
                >
                  <Link href={"/"}>Go to home page</Link>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
