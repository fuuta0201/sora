"use server";
import { revalidateTag } from "next/cache";
import { createPost } from "@/lib/microcms";
import { CreatePayload } from "@/types/microcms";

export const createPostAction = async (
  payload: CreatePayload
): Promise<void> => {
  // TODO : verify session
  await createPost(payload);
  revalidateTag("posts", "max");
};
