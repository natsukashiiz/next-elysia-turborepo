import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoutButton from "./logout-button";
import { Skeleton } from "./ui/skeleton";

export const ProfileSkeleton = () => <Skeleton className="w-full h-24" />;

const Profile = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="w-full flex flex-col space-y-2">
        <p className="text-lg text-gray-600">Hello, guest</p>
        <Button className="w-full" variant={"outline"} asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-2">
      <p className="text-xl font-medium p-2 rounded-xl border">
        Hello, {session.user.name}
      </p>
      <LogoutButton />
    </div>
  );
};

export default Profile;
