import "server-only";
import { env } from "@/env";
import {
  PostContent,
  PostsResponse,
  postContentSchema,
  postsResponseSchema,
} from "@/types/microcms";
import { LIST_LIMIT } from "@/utils/constants";

// GET Posts
export const getPosts =
  async (): Promise<PostsResponse | null> => {
    const url = new URL(
      `/api/v1/posts`,
      `https://${env.MICROCMS_SERVICE_DOMAIN}.microcms.io`
    );
    url.searchParams.set("limit", String(LIST_LIMIT));

    try {
      const res = await fetch(url, {
        headers: {
          "X-MICROCMS-API-KEY": env.X_MICROCMS_API_KEY,
        },
        next: {
          tags: ["posts"],
        },
      });
      if (!res.ok) {
        console.error(
          "microCMS request failed",
          res.status,
          await res.text()
        );
        return null;
      }
      const json = await res.json();

      const parsed = postsResponseSchema.safeParse(json);
      if (!parsed.success) {
        throw new Error("Invalid microCMS response");
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
      return null;
    }
  };
