import { Prisma } from "./prisma";

export async function traerSanciones(idCurso = 0,) {
    try {
        const sanciones = idCurso === 0 ? await Prisma.newPrisma().sancionXusuario.findMany({
            include: {
                sancion: true,
                usuario: true
            }
        }) : await Prisma.newPrisma().sancion.findMany({
            include: {
                cursoXDivision: {
                    include: {
                        curso: true,
                        division: true
                    }
                }
            },
            where: {
                cursoXDivision: {
                    id: idCurso
                }
            }
        })

        Prisma.disconnect()
        return sanciones
    } catch (error) {
        console.error(error);
    }
}

export async function generarSancion(idUsuario, idCurso, motivo, idTipoSancion, fecha) {
    try {
        const sancion = idCurso !== 0 ? await Prisma.newPrisma().sancion.create({
            data: {
                fecha: new Date(fecha),
                motivo: motivo,
                idTipoSancion: idTipoSancion,
                idCursoXDivision: idCurso
            }
        }) : await Prisma.newPrisma().sancion.create({
            data: {
                fecha: new Date(fecha),
                motivo: motivo,
                idTipoSancion: idTipoSancion,
                sancionXusuario: {
                    create: {
                        idUsuario: idUsuario,
                    }
                },
            }
        })
        return sancion
    } catch (error) {
        console.log(error);
    }
}

export async function traerTipoSanciones() {
    try {
        const tipoSanciones = await Prisma.newPrisma().tipoSancion.findMany()
        return tipoSanciones
    } catch (error) {
        console.error(error);
    }
}