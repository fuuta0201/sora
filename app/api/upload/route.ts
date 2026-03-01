import { NextResponse } from "next/server";
import { env } from "@/env";

export async function POST(req: Request) {
  try {
    const incoming = await req.formData();
    const file = incoming.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "file is required" },
        { status: 400 }
      );
    }

    const url = new URL(
      "/api/v1/media",
      `https://${env.MICROCMS_SERVICE_DOMAIN}.microcms-management.io`
    );

    const form = new FormData();
    form.append("file", file, file.name);

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "X-MICROCMS-API-KEY": env.X_MICROCMS_API_KEY,
      },
      body: form,
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "microCMS upload failed", detail: text },
        { status: res.status }
      );
    }

    const json = (await res.json()) as { url?: string };
    if (!json.url) {
      return NextResponse.json(
        {
          error: "Invalid microCMS response",
          detail: json,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: json.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
