import { Prisma } from "./prisma";

export async function ListarMaterias(idCurso) {
    try {
        const materias = await Prisma.newPrisma().materia.findMany({
            include: {
                curso: true
            },
            where: {
                idCurso: idCurso
            }
        })
        return materias
    } catch (error) {
        console.error(error);
    } finally {
        Prisma.disconnect()
    }
}