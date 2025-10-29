import { BASE_URL } from "@/common/server";
import { ICurrentSocketStatus } from "@/components/status/status";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${BASE_URL}/v1/socket-status`, {
    cache: "no-store",
  });
  const data = await res.json();
  return NextResponse.json<ICurrentSocketStatus>(data);
}
