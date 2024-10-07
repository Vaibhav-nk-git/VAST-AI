import { PrismaClient } from "@prisma/client";

declare global {
  // Extending the globalThis interface
  namespace globalThis {
    var prisma: PrismaClient | undefined;
  }
}
