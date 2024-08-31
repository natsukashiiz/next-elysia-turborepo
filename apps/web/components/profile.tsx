import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "./logout-button";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="border w-full rounded-xl"></div>
      {session ? (
        <p className="text-xl font-medium p-2 rounded-xl border">
          Hello, {session.user?.name}
        </p>
      ) : (
        <p className="text-lg text-gray-600">Hello, guest</p>
      )}
      <hr />
      {session ? (
        <LogoutButton />
      ) : (
        <Button className="w-full" variant={"outline"} asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </>
  );
};

export default Profile;
