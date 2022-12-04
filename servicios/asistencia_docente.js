import { Prisma } from "./prisma";

export async function TraerAsistencias(options) {
    try {
        const asistencias = await Prisma.newPrisma().asistenciadocente.findMany(options)
        return asistencias
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}

export async function DetalleAsistencia(id) {
    try {
        const asistencia = await Prisma.newPrisma().asistenciadocente.findUnique({
            include: {
                usuario: true,
                docentexmateria: {
                    include: {
                        usuario: true
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

export async function updateAsistencia(id, presente = false, ausente = false, ausenteJustificado = false, llegadaTarde = false, llegadaTardeJustificada = false, mediaFalta = false, mediaFaltaJustificada = false, motivo = "", idUsuario) {
    try {
        const asistencia = await Prisma.newPrisma().asistenciadocente.update({
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

