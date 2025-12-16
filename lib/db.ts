import { PrismaClient } from "@prisma/client"


// Prevent multiple instances of Prisma Client in development.
//prisma client means that it will be used to interact with the database.like querying, inserting, updating, and deleting data.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const db = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db

