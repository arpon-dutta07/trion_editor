import NextAuth from "next-auth";
import { apiAuthPrefix, authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "./routes";
import authConfig from "./auth.config";


const {auth} = NextAuth(authConfig);

export default auth((req)=>{
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return null;
    }
    // If the request is for an API auth route, allow it to proceed without any checks
    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT , nextUrl))
        }

        return null;
    }
    // If the request is for an auth route and the user is logged in, redirect to the default login redirect page
    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/sign-in" , nextUrl))
    }

    return null;
})


export const config = {
  // copied from clerk
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], // Match all routes except for static files and Next.js internals
};
// In the above code, we have defined a middleware function using NextAuth's auth method.
// This middleware checks if the incoming request is for an authentication route, a public route, or a protected route.
// Depending on the user's authentication status and the type of route, it either allows the request to proceed or redirects the user to the appropriate page.