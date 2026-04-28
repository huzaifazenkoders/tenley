import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
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

  // Refreshes session and propagates updated cookies to the browser
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");
  const isPublicRoute =
    isAuthRoute ||
    pathname.startsWith("/accept-invitation") ||
    pathname.startsWith("/represented-company");
  const isManagerRoute = pathname.startsWith("/manager");
  const isOnboardingRoute = pathname.startsWith("/onboarding");

  // Unauthenticated users can only access public routes
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/sign-in";
    return NextResponse.redirect(url);
  }

  // Authenticated users should not see auth pages
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Role-based routing for authenticated users on non-public routes
  if (user && !isPublicRoute) {
    const { data: meData } = await supabase.rpc("me");
    const profile =
      (meData as Record<string, unknown> | null)?.profile ??
      (meData as Record<string, unknown> | null)?.profile_information ?? null;
    const userRole = (profile as Record<string, unknown> | null)?.user_role as string | undefined;
    const isOnboardingComplete = (profile as Record<string, unknown> | null)?.is_onboarding_complete as boolean | undefined;

    if (userRole === "manager" && !isManagerRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/manager";
      return NextResponse.redirect(url);
    }

    if (
      userRole === "company_admin" &&
      !isOnboardingComplete &&
      !isOnboardingRoute
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/onboarding";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static  (static assets)
     * - _next/image   (image optimisation)
     * - favicon.ico, sitemap.xml, robots.txt
     * - common image extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
