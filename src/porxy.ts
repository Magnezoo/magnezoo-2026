import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session && !request.url.includes("/admin")) {
    return new Response("Unauthorized", { status: 401 });
  }
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|signin|terms|privacy|.*\\.png|.*\\.webp|.*\\.svg).*)",
};
