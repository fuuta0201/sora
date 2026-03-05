// microCMS APIより取得されるデータの型定義
import { z } from "zod";
import { GENRE_LIST } from "@/utils/constants";

const imageUrlSchema = z.object({
  url: z.url(),
  width: z.number(),
  height: z.number(),
});

const categorySchema = z.enum(
  GENRE_LIST as [string, ...string[]]
);
export type Category = z.infer<typeof categorySchema>;

export const postContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  imageUrl: imageUrlSchema,
  category: z.array(categorySchema),
  user: z.email(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
  revisedAt: z.string().optional(),
});
export type PostContent = z.infer<typeof postContentSchema>;

export const postsResponseSchema = z.object({
  contents: z.array(postContentSchema),
  totalCount: z.number().int().nonnegative(),
  offset: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
});
export type PostsResponse = z.infer<
  typeof postsResponseSchema
>;

// POST payload
export const createPayloadSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  imageUrl: z.url(),
  category: z.array(categorySchema),
  user: z.email(),
});
export type CreatePayload = z.infer<
  typeof createPayloadSchema
>;
