import { Prisma } from "./prisma";



export async function ListadoAsistenciasMensual(idAlumno) {
    try {
        return await Prisma.newPrisma.$queryRaw`SELECT 
        *
    FROM asistencia a
    inner join alumnoxcursoxdivision al on al.id = a.idalumnoxcursoxdivision
    inner join usuario u on u.id = al.idusuario
    where (TO_DATE(creadoen,'DD/MM/YYYY') between  TO_DATE('01/10/2022','DD/MM/YYYY') and TO_DATE('31/10/2022','DD/MM/YYYY') ) and idalumnoxcursoxdivision = 1
      order by creadoen asc`


    } catch (error) {
        console.error(error);
    }
}

export async function ConteoAsistenciasAnual(idAlumno) {
    try {
        const conteo = await Prisma.newPrisma.$queryRaw`SELECT a.idalumnoxcursoxdivision,
    (SELECT COUNT(*) FROM asistencia WHERE presente = true  and idalumnoxcursoxdivision = ${Number(idAlumno)}) as presente,
    (SELECT COUNT(*) FROM asistencia WHERE ausente = true  and idalumnoxcursoxdivision = ${Number(idAlumno)}) as ausente,
    (SELECT COUNT(*) FROM asistencia WHERE ausentejustificado = true and idalumnoxcursoxdivision = ${Number(idAlumno)}) as ausentejustificado ,
    (SELECT COUNT(*) FROM asistencia WHERE  llegadatarde= true and idalumnoxcursoxdivision = ${Number(idAlumno)}) as llegadatarde,
    (SELECT COUNT(*) FROM asistencia WHERE llegadatardejustificada= true and idalumnoxcursoxdivision = ${Number(idAlumno)}) as llegadatardejustificada,
    (SELECT COUNT(*) FROM asistencia WHERE mediafalta= true and idalumnoxcursoxdivision = ${Number(idAlumno)}) as mediafalta,
    (SELECT COUNT(*) FROM asistencia WHERE mediafaltajustificada= true and idalumnoxcursoxdivision = ${Number(idAlumno)}) as mediafaltajustificada
FROM asistencia as a
where idalumnoxcursoxdivision = ${Number(idAlumno)}
group by a.idalumnoxcursoxdivision`

        var presente = JSON.stringify(conteo, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        let present = JSON.parse(presente)
        return present

    } catch (error) {
        console.error(error);
    }
}

export async function ConteoAsistenciasMensual(idAlumno) {
    try {
        const conteo = await Prisma.newPrisma.$queryRaw`SELECT a.idalumnoxcursoxdivision,
    (SELECT COUNT(*) FROM asistencia WHERE presente = true  and idalumnoxcursoxdivision = ${Number(idAlumno)}) as presente,
    (SELECT COUNT(*) FROM asistencia WHERE ausente = true  and idalumnoxcursoxdivision = ${Number(idAlumno)}) as ausente,
    (SELECT COUNT(*) FROM asistencia WHERE ausentejustificado = true and idalumnoxcursoxdivision = ${Number(idAlumno)}) as ausentejustificado ,
    (SELECT COUNT(*) FROM asistencia WHERE  llegadatarde= true and idalumnoxcursoxdivision = ${Number(idAlumno)}) as llegadatarde,
    (SELECT COUNT(*) FROM asistencia WHERE llegadatardejustificada= true and idalumnoxcursoxdivision = ${Number(idAlumno)}) as llegadatardejustificada,
    (SELECT COUNT(*) FROM asistencia WHERE mediafalta= true and idalumnoxcursoxdivision = ${Number(idAlumno)}) as mediafalta,
    (SELECT COUNT(*) FROM asistencia WHERE mediafaltajustificada= true and idalumnoxcursoxdivision = ${Number(idAlumno)}) as mediafaltajustificada
FROM asistencia as a
where (TO_DATE(creadoen,'DD/MM/YYYY') between  TO_DATE('01/10/2022','DD/MM/YYYY') and TO_DATE('31/10/2022','DD/MM/YYYY') ) and idalumnoxcursoxdivision = ${Number(idAlumno)}
group by a.idalumnoxcursoxdivision`

        var presente = JSON.stringify(conteo, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        let present = JSON.parse(presente)
        return present

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
    }
}

export async function TraerAsistencias(options) {
    try {
        const asistencias = await Prisma.newPrisma.asistencia.findMany(options)
        return asistencias
    } catch (error) {
        console.log(error);
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
    }
}

