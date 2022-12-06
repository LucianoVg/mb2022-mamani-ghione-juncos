import { Prisma } from "./prisma";


export async function ConteoAsistencias() {
    try {
        const conteo = await Prisma.newPrisma().asistencia.findMany({
            where: {
                AND: [
                    {
                        creadoen: {
                            lte: '01/11/2022',
                            gte: '01/10/2022',
                        }
                    },
                    {
                        idalumnoxcursoxdivision: 1
                    }
                ]

            }
        })
        return conteo
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}



export async function ListarCurso() {
    try {
        const cursos = await Prisma.newPrisma().cursoxdivision.findMany({
            include: {
                curso: true,
                division: true
            }
        })

        return cursos
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}

export async function TraerAsistencias(options) {
    try {
        const asistencias = await Prisma.newPrisma().asistencia.findMany(options)
        return asistencias
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}

export async function DetalleAsistencia(id) {
    try {
        const asistencia = await Prisma.newPrisma().asistencia.findUnique({
            include: {
                usuario: true,
                alumnoxcursoxdivision: {
                    include: {
                        usuario: true,
                        cursoxdivision: {
                            include: {
                                curso: true,
                                division: true
                            }
                        }
                    }
                }
            },
            where: {
                id: Number(id)
            }

        })
        console.log(asistencia);
        return asistencia
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}

export async function updateAsistencia(id, presente, ausente, ausenteJustificado, llegadaTarde, llegadaTardeJustificada, mediaFalta, mediaFaltaJustificada, motivo = "", idUsuario) {
    try {
        const asistencia = await Prisma.newPrisma().asistencia.update({
            data: {
                presente: presente,
                ausente: ausente,
                ausentejustificado: ausenteJustificado,
                llegadatarde: llegadaTarde,
                llegadatardejustificada: llegadaTardeJustificada,
                mediafalta: mediaFalta,
                mediafaltajustificada: mediaFaltaJustificada,
                motivo: motivo,
                idusuario: Number(idUsuario),
                actualizadoen: new Date().toLocaleDateString('es-AR').split('T')[0]
            },
            where: {
                id: Number(id)
            }
        })
        return asistencia
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}

