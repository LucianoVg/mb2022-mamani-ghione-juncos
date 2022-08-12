import { PrismaClient } from "@prisma/client";

export class Prisma {
    private static instancia: PrismaClient
    private constructor() {
    }

    public static newPrisma(): PrismaClient {
        if (!Prisma.instancia) {
            Prisma.instancia = new PrismaClient();
        }

        return Prisma.instancia;
    }
}