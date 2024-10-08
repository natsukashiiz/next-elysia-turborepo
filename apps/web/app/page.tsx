import { Suspense, lazy } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { HelloSomethingSkeleton } from "@/components/hello-something";
import { ProfileSkeleton } from "@/components/profile";
import { Button } from "@/components/ui/button";

const HelloSomething = lazy(() => import("@/components/hello-something"));
const Count = lazy(() => import("@/components/count"));
const Profile = lazy(() => import("@/components/profile"));

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl flex justify-center">
      <div className="flex flex-col items-center space-y-2 mt-[20%]">
        <Card className="w-[380px]">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Next.js and Elysia.js With TurboRepo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Suspense fallback={<HelloSomethingSkeleton />}>
                <HelloSomething />
              </Suspense>
              <p className="text-lg text-gray-600">
                Welcome to my project using TurboRepo
              </p>
              <Count />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Suspense fallback={<ProfileSkeleton />}>
              <Profile />
            </Suspense>
            <hr />
            <Button className="w-full" variant={"secondary"} asChild>
              <Link href="/protected">Go to protected page</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
