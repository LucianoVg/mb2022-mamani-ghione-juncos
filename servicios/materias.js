import { Prisma } from "./prisma";

export async function ListarMaterias() {
    try {
        const materias = await Prisma.newPrisma().materia.findMany()
        return materias
    } catch (error) {
        console.error(error);
    } finally {
        Prisma.disconnect()
    }
}