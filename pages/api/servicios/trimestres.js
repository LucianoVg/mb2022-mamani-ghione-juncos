import { Prisma } from "./prisma";

export async function traerTrimestres() {
    try {
        const trimestres = await Prisma.newPrisma.trimestre.findMany()
        return trimestres
    } catch (error) {
        console.log(error);
    }
}