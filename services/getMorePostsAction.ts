"use server";
import { getPosts, getPostsByUser } from "@/lib/microcms";
import { PostsResponse } from "@/types/microcms";

export const getMorePostsAction = async (
  offset: number,
  email?: string
): Promise<PostsResponse | null> => {
  // TODO : verify session
  if (email) {
    return await getPostsByUser(email, offset);
  } else {
    return await getPosts(offset);
  }
};
