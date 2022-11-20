import { prisma } from "../prisma/db";

export async function ListarMaterias() {
    try {
        const materias = await prisma.materia.findMany()
        return materias
    } catch (error) {
        console.error(error);
    }
}