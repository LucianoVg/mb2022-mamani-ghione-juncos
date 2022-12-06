import { Prisma } from "./prisma";

export default async function traerAlumnos() {
    try {
        const alumnos = await Prisma.newPrisma().alumnoxcursoxdivision.findMany({
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


