"use server";
import { getPosts } from "@/lib/microcms";
import { PostsResponse } from "@/types/microcms";

export const getMorePostsAction = async (
  offset: number
): Promise<PostsResponse | null> => {
  // TODO : verify session
  return await getPosts(offset);
};
