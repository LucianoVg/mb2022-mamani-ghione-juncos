import { Prisma } from "./prisma";

export default async function traerAlumnos() {
    try {
        const alumnos = await Prisma.newPrisma.alumnoxcursoxdivision.findMany({
            include: {
                cursoxdivision: {
                    include: {
                        curso: true,
                        division: true
                    }
                }
            }
        });
        return alumnos
    } catch (error) {
        console.error(error);
    }
}

export async function traerAlumno(idusuario) {
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
                    id: Number(idusuario)
                }
            }
        })
        return alumno
    } catch (error) {
        console.log(error);
    }
}

