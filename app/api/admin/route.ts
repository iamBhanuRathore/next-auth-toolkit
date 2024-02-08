import { useServerUser } from "@/hooks/use-server-user";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await useServerUser();
  if (user?.role === UserRole.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }
  return new NextResponse(null, { status: 403 });
}
