import { Prisma } from "./prisma";

export async function ListarMaterias(idCurso) {
    try {
        const materias = idCurso ? await Prisma.newPrisma().materia.findMany({
            include: {
                curso: true
            },
            where: {
                idcurso: Number(idCurso)
            }
        }) : await Prisma.newPrisma().materia.findMany({
            include: {
                curso: true
            }
        })
        return materias
    } catch (error) {
        console.error(error);
    } finally {
        Prisma.disconnect()
    }
}