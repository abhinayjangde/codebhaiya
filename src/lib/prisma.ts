import env from "@/config/env";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

function normalizePgConnectionString(connectionString: string): string {
  try {
    const parsed = new URL(connectionString);
    const sslMode = parsed.searchParams.get("sslmode");

    // Preserve current strong TLS behavior and silence pg v8 warnings.
    if (
      sslMode === "prefer" ||
      sslMode === "require" ||
      sslMode === "verify-ca"
    ) {
      parsed.searchParams.set("sslmode", "verify-full");
      return parsed.toString();
    }

    return connectionString;
  } catch {
    return connectionString;
  }
}

const pool = new Pool({
  connectionString: normalizePgConnectionString(env.databaseUrl),
  max: 10,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 10000,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
