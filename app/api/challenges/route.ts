import { NextResponse } from "next/server";
import { ChallengeSubmissionModel } from "@/models/ChallengeSubmission";
import { connectToDatabase } from "@/lib/mongodb";
import { challengeSchema } from "@/lib/challenge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_LENGTH = 10_000;

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Send the form as JSON." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_LENGTH) {
    return NextResponse.json({ error: "The submitted form is too large." }, { status: 413 });
  }

  const reader = request.body?.getReader();
  if (!reader) {
    return NextResponse.json({ error: "The form data could not be read." }, { status: 400 });
  }

  const chunks: Uint8Array[] = [];
  let bodyLength = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      bodyLength += value.byteLength;
      if (bodyLength > MAX_BODY_LENGTH) {
        await reader.cancel();
        return NextResponse.json({ error: "The submitted form is too large." }, { status: 413 });
      }
      chunks.push(value);
    }
  } catch {
    return NextResponse.json({ error: "The form data could not be read." }, { status: 400 });
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(bodyLength);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  let payload: unknown;
  try {
    payload = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body));
  } catch {
    return NextResponse.json({ error: "The form data could not be read." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ error: "Enter the requested challenge details." }, { status: 400 });
  }

  const formData = payload as Record<string, unknown>;
  if (typeof formData.website === "string" && formData.website.trim() !== "") {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const result = challengeSchema.safeParse(formData);
  if (!result.success) {
    return NextResponse.json(
      { error: "Check the form fields and try again.", fields: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    await ChallengeSubmissionModel.create(result.data);
  } catch (error) {
    console.error(
      "Challenge submission could not be saved.",
      error instanceof Error ? error.name : "Unknown error"
    );
    return NextResponse.json(
      { error: "We couldn't save your submission right now. Please try again shortly." },
      { status: 503 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
