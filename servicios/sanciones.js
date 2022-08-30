import { Prisma } from "./prisma";

export async function traerSanciones() {
    try {
        const sanciones = await Prisma.newPrisma().sancionXusuario.findMany({
            include: {
                sancion: {
                    include: {
                        cursoXDivision: {
                            include: {
                                curso: true,
                                division: true
                            }
                        }
                    }
                },
                usuario: true,
            }
        })
        Prisma.disconnect()
        return sanciones
    } catch (error) {
        console.error(error);
    }
}