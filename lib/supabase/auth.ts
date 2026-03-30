import { createClient } from "./server";
import { redirect } from "next/navigation";

export async function verifySession() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.log("Failed to login");
    redirect("/login");
  }

  return user;
}
