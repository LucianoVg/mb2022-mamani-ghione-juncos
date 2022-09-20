import { Prisma } from "./prisma";

export async function traerCursosXDivision() {
    try {
        const cursosXDivision = await Prisma.newPrisma().cursoXdivision.findMany({
            distinct: ['idCurso', 'idDivision'],
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
            },
            orderBy: {
                curso: {
                    nombre: 'asc'
                }
            }
        })
        Prisma.disconnect()
        return cursosXDivision
    } catch (error) {
        console.log(error);
    }
}