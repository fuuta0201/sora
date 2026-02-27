import "server-only";
import { createClient } from "microcms-js-sdk";
import { env } from "@/env";
import {
  PostContent,
  PostsResponse,
  postContentSchema,
  postsResponseSchema,
} from "@/types/microcms";
import { InternalServerError } from "@/utils/errors";
import { LIST_LIMIT } from "@/utils/constants";

const client = createClient({
  serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
  apiKey: env.X_MICROCMS_API_KEY,
});

// GET Posts
export const getPosts = async (): Promise<
  PostsResponse | Error
> => {
  try {
    const res = await client.getList({
      endpoint: "posts",
      queries: { limit: LIST_LIMIT },
    });

    const parsed = postsResponseSchema.safeParse(res);
    if (!parsed.success) {
      console.error(
        "Invalid microCMS response",
        parsed.error.issues
      );
      return InternalServerError;
    }

    const data = parsed.data;

    const validPosts: PostContent[] = [];
    data.contents.forEach((content, index) => {
      const validatedPost =
        postContentSchema.safeParse(content);
      if (validatedPost.success) {
        validPosts.push(validatedPost.data);
        return;
      }

      console.error("Skipped invalid post", {
        index,
        issues: validatedPost.error.issues,
      });
    });

    return {
      ...data,
      contents: validPosts,
    };
  } catch (error) {
    console.error(
      "Failed to fetch posts from microCMS",
      error
    );

    return InternalServerError;
  }
};
