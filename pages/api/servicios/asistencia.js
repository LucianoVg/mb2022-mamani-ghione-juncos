import { Prisma } from "./prisma";

export async function ConteoAsistencias() {
    try {
<<<<<<< Updated upstream:servicios/asistencia.js
        const conteo = await Prisma.newPrisma().$queryRaw`SELECT a.idalumnoxcursoxdivision,
        (SELECT COUNT(*) FROM asistencia WHERE presente = true   and idalumnoxcursoxdivision = 2) as presente,
        (SELECT COUNT(*) FROM asistencia WHERE ausente = true   and idalumnoxcursoxdivision = 2) as ausente,
        (SELECT COUNT(*) FROM asistencia WHERE ausentejustificado = true  and idalumnoxcursoxdivision = 2) as ausentejustificado ,
        (SELECT COUNT(*) FROM asistencia WHERE  llegadatarde= true  and idalumnoxcursoxdivision = 2) as llegadatarde,
        (SELECT COUNT(*) FROM asistencia WHERE llegadatardejustificada= true  and idalumnoxcursoxdivision = 2) as llegadatardejustificada,
        (SELECT COUNT(*) FROM asistencia WHERE mediafalta= true and idalumnoxcursoxdivision = 2) as mediafalta,
        (SELECT COUNT(*) FROM asistencia WHERE mediafaltajustificada= true  and idalumnoxcursoxdivision = 2) as mediafaltajustificada
    FROM asistencia as a
    where (TO_DATE(creadoen,'DD/MM/YYYY') between  TO_DATE('01/10/2022','DD/MM/YYYY') and TO_DATE('31/10/2022','DD/MM/YYYY') ) and idalumnoxcursoxdivision = 2
    group by a.idalumnoxcursoxdivision`

    return JSON.stringify(conteo, (_, v) => typeof v === 'bigint' ? v.toString() : v)
=======
        const conteo = await Prisma.newPrisma.asistencia.findMany({
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
>>>>>>> Stashed changes:pages/api/servicios/asistencia.js

    } catch (error) {
        console.error(error);
    }
}





export async function ListarCurso() {
    try {
        const cursos = await Prisma.newPrisma.cursoxdivision.findMany({
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
        const asistencias = await Prisma.newPrisma.asistencia.findMany(options)
        return asistencias
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}

export async function DetalleAsistencia(id) {
    try {
        const asistencia = await Prisma.newPrisma.asistencia.findUnique({
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
        const asistencia = await Prisma.newPrisma.asistencia.update({
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

