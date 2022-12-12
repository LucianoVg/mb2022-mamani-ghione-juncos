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

export async function traerAlumno(legajo) {
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
                    legajo: legajo
                }
            }
        })
        return alumno
    } catch (error) {
        console.log(error);
    }
}

