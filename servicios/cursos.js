import { prisma } from "../prisma/db";

export async function traerCursosXDivision() {
    try {
        const cursosXDivision = await prisma.cursoXdivision.findMany({
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
    }
}