import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

export default{
    providers: [
        Github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
} satisfies NextAuthConfig;



// In the above code, we have defined the authentication configuration for NextAuth.
// We have added two providers: GitHub and Google.
// The client IDs and client secrets for these providers are fetched from environment variables.
// Finally, we export the configuration object as the default export of the module.
