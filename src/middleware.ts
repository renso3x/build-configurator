import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  console.log(`[ROOT MIDDLEWARE] Called for path: ${request.nextUrl.pathname}`);
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Simpler matcher for testing
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
