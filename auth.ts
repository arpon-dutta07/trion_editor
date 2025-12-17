import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"; 
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getAccountByUserId, getUserById } from "./features/auth/actions";

export const {auth, handlers, signIn, signOut} = NextAuth({
 callbacks:{

    async signIn({user , account , profile}){
        if(!user || !account)
            return false; // If there is no user or account, deny sign-in


        const existingUser = await db.user.findUnique({
            where:{email:user.email!}
        })// Check if a user with the same email already exists in the database

        if(!existingUser){
            const newUser= await db.user.create({
                data:{
                    email:user.email!,
                    name:user.name!,
                    image:user.image!,

                    accounts:{
                        create:{
                            type:account.type,
                            provider:account.provider,
                            providerAccountId:account.providerAccountId,
                            access_token:account.access_token,
                            expires_at:account.expires_at,
                            token_type:account.token_type,
                            scope:account.scope,
                            id_token:account.id_token,
                            session_state:account.session_state
                            
                        }// Create a new account record linked to the user
                    },
                },
            });// If the user does not exist, create a new user record in the database

            if(!newUser){
                return false; // If user creation fails, deny sign-in
            }
        }
        
        else {
            const existingAccount = await db.account.findUnique({
                where:{
                    provider_providerAccountId:{
                        provider:account.provider,
                        providerAccountId:account.providerAccountId
                    }
                }// Check if an account already exists for this user with the given credentials 
            })
            if(!existingAccount){
                await db.account.create({
                    data:{
                        userId:existingUser.id,
                        type:account.type,
                        provider:account.provider,
                        providerAccountId:account.providerAccountId,
                        access_token:account.access_token,
                        expires_at:account.expires_at,
                        token_type:account.token_type,
                        scope:account.scope,
                        id_token:account.id_token,
                        session_state:account.session_state
                    }
                });
            }// If an account doesn't exist for this user, create one account for them.
        }
        return true; // Allow sign-in if all checks pass
    },

    // This callback is invoked whenever a JSON Web Token is created (i.e., at sign-in).
    async jwt({token , user , account}){
        if(!token.sub) //sub is user id
            return token;
        const existingUser = await getUserById(token.sub);// Fetch the user from the database using the getUserById function

        if(!existingUser){
            return token; // If the user does not exist, return the token as is
        }

        const existingAccount = await getAccountByUserId(existingUser.id);// Fetch the account associated with the user using the getAccountByUserId function

        // You can add any account-related information to the token if needed
        token.name = existingUser.name;
        token.email = existingUser.email;
        token.role = existingUser.role;
        return token; // Return the modified token
    },

    // This callback is invoked whenever a session is checked.
    // session object means user data sent to the client
    async session({session , token}){
        if(token.sub && session.user){ //token.sub = user ID stored in JWT token
            session.user.id = token.sub; //This line inserts that user ID into session.user.id
        }

        if(token.sub && session.user){
            session.user.role = token.role // token.role is a custom field you added earlier in the JWT callback.
        }//This line sends that role to the frontend inside session.user.

        return session; //Because the session is what your client-side React components read.
    }
},
    secret:process.env.AUTH_SECRET, // Secret for signing the JWTs
    adapter:PrismaAdapter(db), // Use PrismaAdapter with the Prisma client instance
    session:{strategy:"jwt"}, // Use JWT strategy for sessions  
    ...authConfig // Spread the authentication configuration object imported from auth.config.ts
});