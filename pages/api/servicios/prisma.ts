import { PrismaClient } from "@prisma/client";

export class Prisma {
    private static _newPrisma?: PrismaClient

    public static get newPrisma(): PrismaClient {
        if (!this._newPrisma) {
            this._newPrisma = new PrismaClient()
        }
        return this._newPrisma
    }

    public static disconnect() {
        if (Prisma._newPrisma) {
            Prisma._newPrisma.$disconnect()
        }
    }
}