import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProtectedPage() {
  return (
    <div className="mx-auto max-w-7xl flex justify-center">
      <div className="flex flex-col items-center space-y-2 mt-[20%]">
        <Card className="w-[380px]">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Protected page. You must be authenticated to view this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Button className="w-full" asChild>
                <Link href="/">Go to home page</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
