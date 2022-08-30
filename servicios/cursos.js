import { Prisma } from "./prisma";

export async function traerCursosXDivision() {
    try {
        const cursosXDivision = await Prisma.newPrisma().cursoXdivision.findMany({
            distinct: ['idCurso', 'IdDivision'],
            select: {
                id: true,
                curso: {
                    select: {
                        id: true,
                        nombre: true
                    }
                },
                division: {
                    select: {
                        id: true,
                        division: true
                    }
                }
            }
        })
        Prisma.disconnect()
        return cursosXDivision
    } catch (error) {
        console.log(error);
    }
}