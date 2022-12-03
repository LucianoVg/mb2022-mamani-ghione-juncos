import { Prisma } from "./prisma";

export async function traerCursosXDivision() {
    try {
        const cursosXDivision = await Prisma.newPrisma().cursoxdivision.findMany({
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
        return cursosXDivision
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}