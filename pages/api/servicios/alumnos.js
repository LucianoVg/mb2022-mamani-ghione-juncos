import { Prisma } from "./prisma";

export default async function traerAlumnos(idCursoDivision = 1) {
    try {
        const alumnos = await Prisma.newPrisma.alumnoxcursoxdivision.findMany({
            include: {
                usuario: true,
                cursoxdivision: {
                    include: {
                        curso: true
                    }
                }
            },
            where: {
                cursoxdivision: {
                    id: Number(idCursoDivision)
                }
            },
            orderBy: {
                usuario: {
                    nombre: 'asc'
                }
            }

        })
        return alumnos
    } catch (error) {
        console.error(error);
    }
}

export async function traerAlumno(id) {
    try {
        const alumno = await Prisma.newPrisma.alumnoxcursoxdivision.findFirst({
            include: {
                cursoxdivision: {
                    include: {
                        curso: true,
                        division: true
                    }
                },
                tutor: true
            },
            where: {
                usuario: {
                    id: Number(id)
                }
            }
        })
        return alumno
    } catch (error) {
        console.log(error);
    }
}

