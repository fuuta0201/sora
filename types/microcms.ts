// microCMS APIより取得されるデータの型定義
import { z } from "zod";

const imageUrlSchema = z.object({
  url: z.url(),
  width: z.number(),
  height: z.number(),
});

const genreSchema = z.enum(["cute", "sleeping", "walking"]);
export type Genre = z.infer<typeof genreSchema>;

export const postContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  imageUrl: imageUrlSchema,
  genre: z.array(genreSchema),
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
