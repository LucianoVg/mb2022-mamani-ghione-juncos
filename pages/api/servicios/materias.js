import { Prisma } from "./prisma";

export async function ListarMaterias(idCurso) {
    try {

        const materias = idCurso ? await Prisma.newPrisma.materia.findMany({
            include: {
                curso: true
            },
            where: {
                idcurso: Number(idCurso)
            },
            orderBy: {
                id: "asc"
            }
        }) : await Prisma.newPrisma.materia.findMany({
            include: {
                curso: true
            },
            orderBy: {
                id: "asc"
            }
        })
        return materias
    } catch (error) {
        console.error(error);
    }
}