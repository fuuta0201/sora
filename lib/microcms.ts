import "server-only";
import { env } from "@/env";
import {
  PostContent,
  PostsResponse,
  postContentSchema,
  postsResponseSchema,
  CreatePayload,
  createPayloadSchema,
} from "@/types/microcms";
import { LIST_LIMIT } from "@/utils/constants";
import { BadRequestError, InternalServerError } from "@/utils/errors";

// GET Posts
export const getPosts = async (
  offset?: number
): Promise<PostsResponse | null> => {
  const url = new URL(
    `/api/v1/posts`,
    `https://${env.MICROCMS_SERVICE_DOMAIN}.microcms.io`
  );
  url.searchParams.set("limit", String(LIST_LIMIT));
  if (offset !== undefined) {
    url.searchParams.set("offset", String(offset));
  }

  try {
    const res = await fetch(url, {
      headers: {
        "X-MICROCMS-API-KEY": env.X_MICROCMS_API_KEY,
      },
      next: {
        revalidate: 60 * 60, // 1時間キャッシュ
        tags: ["posts"],
      },
    });
    if (!res.ok) {
      console.error("microCMS request failed", res.status, await res.text());
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
      const validatedPost = postContentSchema.safeParse(content);
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
    console.error("Failed to fetch posts from microCMS", error);
    return null;
  }
};

// GET (カテゴリー指定)
export const getPostsByCategory = async (
  cat: string
): Promise<PostsResponse | null> => {
  const url = new URL(
    `/api/v1/posts`,
    `https://${env.MICROCMS_SERVICE_DOMAIN}.microcms.io`
  );
  url.searchParams.set("limit", "5");
  url.searchParams.set("filters", `category[contains]${cat}`);

  try {
    const res = await fetch(url, {
      headers: {
        "X-MICROCMS-API-KEY": env.X_MICROCMS_API_KEY,
      },
      next: {
        revalidate: 60 * 60, // 1時間キャッシュ
        tags: [`posts-category-${cat}`],
      },
    });
    if (!res.ok) {
      console.error("microCMS request failed", res.status, await res.text());
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
      const validatedPost = postContentSchema.safeParse(content);
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
    console.error("Failed to fetch posts from microCMS", error);
    return null;
  }
};

// POST
export const createPost = async (payload: CreatePayload): Promise<void> => {
  const url = new URL(
    "/api/v1/posts",
    `https://${env.MICROCMS_SERVICE_DOMAIN}.microcms.io`
  );

  const parsed = createPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    throw BadRequestError;
  }
  const validPayload = parsed.data;

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "X-MICROCMS-API-KEY": env.X_MICROCMS_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validPayload),
  });

  if (!res.ok) {
    throw InternalServerError;
  }
};
