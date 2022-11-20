import { prisma } from "../prisma/db";

export async function traerTrimestres() {
    try {
        const trimestres = await prisma.trimestre.findMany()
        return trimestres
    } catch (error) {
        console.log(error);
    }
}