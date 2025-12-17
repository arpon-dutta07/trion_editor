// This file contains server-side functions (because of "use server") that:
// Fetch a user from the database using Prisma
// Fetch an account from the database using Prisma
// Get the current user from the authentication session



"use server";
import { auth } from "@/auth"; // Import the auth object from the auth module
import { db } from "@/lib/db"; // Import the database client from the lib/db module

// Function to get user by ID, including their associated accounts
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
        where: { id },
        include: {
            accounts: true, // Include related accounts
        }
    });
    return user;
  } 
  catch (error){
      console.error("Error fetching user:", error);
      return null;
  }
};


// ^You need getUserById → to load their profile
// You need getAccountByUserId → to check how they logged in (Google? GitHub?)

// Function to get account by user ID
export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });
    return account;
  } 
  catch (error)
  {
    console.error("Error fetching account:", error);
    return null;
  }
};


// Function to get the current user from the auth session
export const currentUser = async () => {
  const user = await auth();
  return user?.user;
};

