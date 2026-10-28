import { PrismaClient } from "#/generated/prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./db.sqlite",
})

declare global {
  var __prisma: PrismaClient | undefined
}

export const prisma = globalThis.__prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma
}
