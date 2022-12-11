import { Prisma } from "./prisma";

export async function traerDocente(legajo) {
    try {
        const docente = await Prisma.newPrisma.docentexmateria.findFirst({
            include: {
                usuario: true,
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

export async function traerDocentes() {
    try {
        const docente = await Prisma.newPrisma.usuario.findMany({
            where: {
                rol: {
                    tipo: 'Docente'
                }
            }
        })
        return docente
    } catch (error) {
        console.log(error);
    }
}