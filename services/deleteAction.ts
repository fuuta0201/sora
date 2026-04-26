"use server";
import { revalidateTag } from "next/cache";
import { deletePost } from "@/lib/microcms";

export const deletePostAction = async (
  id: string,
  email: string
): Promise<void> => {
  // TODO : verify session
  await deletePost(id);
  revalidateTag(`posts-user-${email}`, "max");
};
