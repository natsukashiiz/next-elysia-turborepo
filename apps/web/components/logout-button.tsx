"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { ButtonLoading } from "@/components/button-loading";
import { wait } from "@/lib/utils";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await wait(1000);
    await signOut({ callbackUrl: "/login" });
    setLoading(false);
  };
  return (
    <ButtonLoading
      className="w-full"
      variant={"destructive"}
      onClick={handleLogout}
      loading={loading}
    >
      Logout
    </ButtonLoading>
  );
};

export default LogoutButton;
