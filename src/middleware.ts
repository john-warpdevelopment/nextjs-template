import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

type SessionClaims = {
  public_metadata: {
    role?: "admin" | "user";
  };
};

const isProtectedRoute = createRouteMatcher([
  "/",
  "/companies",
  "/companies/create",
  "/companies/update",
]);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();

  if (isProtectedRoute(req)) {
    await auth.protect(
      () => {
        const claims = sessionClaims as unknown as SessionClaims;
        const role = claims.public_metadata.role;

        const isAdmin = role === process.env.CLERK_ADMIN_ROLE;

        return isAdmin;
      },
      {
        unauthorizedUrl: new URL("/unauthorized", req.url).toString(),
        unauthenticatedUrl: new URL("/sign-in", req.url).toString(),
      }
    );
  }
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
