import { Prisma } from "./prisma";

export async function ListarCurso() {
    try {
        const cursos = await Prisma.newPrisma().cursoXdivision.findMany({
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
                alumnoXcursoXdivision: {
                    include: {
                        usuario: true,
                        cursoXdivision: {
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
                ausenteJustificado: ausenteJustificado,
                llegadaTarde: llegadaTarde,
                llegadaTardeJustificada: llegadaTardeJustificada,
                mediaFalta: mediaFalta,
                mediaFaltaJustificada: mediaFaltaJustificada,
                motivo: motivo,
                idUsuario: Number(idUsuario),
                actualizadoEn: new Date().toLocaleDateString('es-AR').split('T')[0]
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

