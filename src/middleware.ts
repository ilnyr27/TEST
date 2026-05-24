import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/coach", "/profile"];

function isProtectedRoute(pathname: string): boolean {
  // Strip locale prefix (e.g. /ru/dashboard → /dashboard)
  const pathWithoutLocale = pathname.replace(/^\/(ru|en)/, "") || "/";
  return protectedRoutes.some(
    (route) =>
      pathWithoutLocale === route || pathWithoutLocale.startsWith(route + "/")
  );
}

export async function middleware(request: NextRequest) {
  // 1. Refresh Supabase session (updates cookies)
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. Check protected routes — redirect to login if not authenticated
  if (!user && isProtectedRoute(request.nextUrl.pathname)) {
    const locale = request.nextUrl.pathname.match(/^\/(ru|en)/)?.[1] || "ru";
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Redirect logged-in users away from auth pages
  if (user) {
    const pathWithoutLocale =
      request.nextUrl.pathname.replace(/^\/(ru|en)/, "") || "/";
    if (pathWithoutLocale === "/login" || pathWithoutLocale === "/signup") {
      const locale =
        request.nextUrl.pathname.match(/^\/(ru|en)/)?.[1] || "ru";
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.url)
      );
    }
  }

  // 4. Run next-intl middleware
  const intlResponse = intlMiddleware(request);

  // 5. Merge Supabase cookies into intl response
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value);
  });

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
