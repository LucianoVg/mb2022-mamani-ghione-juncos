import { Prisma } from "./prisma";

export async function traerDocente(legajo) {
    try {
        const docente = await Prisma.newPrisma.docentexmateria.findFirst({
            include: {
                materia: true
            },
            where: {
                usuario: {
                    legajo: legajo
                }
            }
        })
        return docente
    } catch (error) {
        console.log(error);
    }
}