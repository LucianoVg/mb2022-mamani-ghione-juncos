import { PrismaClient } from "@prisma/client";

export class Prisma {
    static instancia
    _constructor() {
    }

    static newPrisma() {
        if (!Prisma.instancia) {
            Prisma.instancia = new PrismaClient();
        }

        return Prisma.instancia;
    }
}