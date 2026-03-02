import { NextResponse } from "next/server";
import { env } from "@/env";

export async function POST(req: Request) {
  const url = new URL(
    `/api/v1/posts`,
    `https://${env.MICROCMS_SERVICE_DOMAIN}.microcms.io`
  );

  try {
    const json = await req.json();

    // api側のgenreが配列型なので型を合わせる
    const body = {
      ...json,
      genre: [json.genre],
    };

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "X-MICROCMS-API-KEY": env.X_MICROCMS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "microCMS post failed", detail: text },
        { status: res.status }
      );
    }

    const created = await res.json();
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
