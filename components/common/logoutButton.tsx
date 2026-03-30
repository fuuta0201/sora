"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";

const supabase = createClient();

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      className="w-full bg-gray-100"
      onClick={handleLogout}
    >
      ログアウト
    </Button>
  );
}
