import { UserRole } from "@prisma/client";
import NextAuth , {type DefaultSession} from "next-auth"


export type ExtendedUser = DefaultSession["user"] & {
    role:UserRole
}

declare module "next-auth"{
    interface Session{
        user:ExtendedUser
    }
}

import {JWT} from "next-auth/jwt";

// Extending the JWT interface to include the user's role
declare module "next-auth/jwt"{
    interface JWT{
        role:UserRole;
    }
}