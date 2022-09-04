import { PrismaClient } from "@prisma/client";

export class Prisma {
    private static _instancia?: PrismaClient
    _constructor() {
    }

    static newPrisma() {
        if (!Prisma._instancia) {
            Prisma._instancia = new PrismaClient();
            Prisma._instancia.$connect()
        }

        return Prisma._instancia;
    }
    static disconnect() {
        if (Prisma._instancia) {
            Prisma._instancia.$disconnect()
        }
    }
}