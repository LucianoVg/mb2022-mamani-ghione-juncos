import { Prisma } from "./prisma";

export async function ListadoAsistenciasMensual(idDocente, mes) {
    let dia = Number(mes) === 3 || Number(mes) === 5 || Number(mes) === 8 || Number(mes) === 10 || Number(mes) === 12 ? 31 : 30

    let fechaInicio = `01/${mes < 10 ? '0' + mes : mes}/${new Date().getFullYear()}`
    let fechaFin = `${dia}/${mes < 10 ? '0' + mes : mes}/${new Date().getFullYear()}`
    try {
        return await Prisma.newPrisma.$queryRaw`SELECT 
        *
    FROM asistenciadocente a
    inner join alumnoxcursoxdivision al on al.id = a.iddocentexmateria
    inner join usuario u on u.id = al.idusuario
    where (TO_DATE(creadoen,'DD/MM/YYYY') between  TO_DATE(${fechaInicio},'DD/MM/YYYY') and TO_DATE(${fechaFin},'DD/MM/YYYY') ) and iddocentexmateria = ${Number(idDocente)}
      order by creadoen asc`
    } catch (error) {
        console.error(error);
    }
}

export async function ConteoAsistenciasAnual(idDocente) {
    try {
        const conteo = await Prisma.newPrisma.$queryRaw`SELECT a.iddocentexmateria,
    (SELECT COUNT(*) FROM asistenciadocente WHERE presente = true  and iddocentexmateria = ${Number(idDocente)}) as presente,
    (SELECT COUNT(*) FROM asistenciadocente WHERE ausente = true  and iddocentexmateria = ${Number(idDocente)}) as ausente,
    (SELECT COUNT(*) FROM asistenciadocente WHERE ausentejustificado = true and iddocentexmateria = ${Number(idDocente)}) as ausentejustificado ,
    (SELECT COUNT(*) FROM asistenciadocente WHERE  llegadatarde= true and iddocentexmateria = ${Number(idDocente)}) as llegadatarde,
    (SELECT COUNT(*) FROM asistenciadocente WHERE llegadatardejustificada= true and iddocentexmateria = ${Number(idDocente)}) as llegadatardejustificada,
    (SELECT COUNT(*) FROM asistenciadocente WHERE mediafalta= true and iddocentexmateria = ${Number(idDocente)}) as mediafalta,
    (SELECT COUNT(*) FROM asistenciadocente WHERE mediafaltajustificada= true and iddocentexmateria = ${Number(idDocente)}) as mediafaltajustificada
    FROM asistenciadocente as a
    where iddocentexmateria = ${Number(idDocente)}
    group by a.iddocentexmateria`
        var presente = JSON.stringify(conteo, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        let present = JSON.parse(presente)
        return present

    } catch (error) {
        console.error(error);
    }
}

export async function ConteoAsistenciasMensual(idDocente, mes) {
    let dia = Number(mes) === 3 || Number(mes) === 5 || Number(mes) === 8 || Number(mes) === 10 || Number(mes) === 12 ? 31 : 30

    let fechaInicio = `01/${mes < 10 ? '0' + mes : mes}/${new Date().getFullYear()}`
    let fechaFin = `${dia}/${mes < 10 ? '0' + mes : mes}/${new Date().getFullYear()}`
    try {
        console.log(fechaInicio, fechaFin);
        const conteo = await Prisma.newPrisma.$queryRaw`SELECT a.iddocentexmateria,
            (SELECT COUNT(*) FROM asistenciadocente WHERE presente = true  and iddocentexmateria = ${Number(idDocente)}) as presente,
            (SELECT COUNT(*) FROM asistenciadocente WHERE ausente = true  and iddocentexmateria = ${Number(idDocente)}) as ausente,
            (SELECT COUNT(*) FROM asistenciadocente WHERE ausentejustificado = true and iddocentexmateria = ${Number(idDocente)}) as ausentejustificado ,
            (SELECT COUNT(*) FROM asistenciadocente WHERE  llegadatarde= true and iddocentexmateria = ${Number(idDocente)}) as llegadatarde,
            (SELECT COUNT(*) FROM asistenciadocente WHERE llegadatardejustificada= true and iddocentexmateria = ${Number(idDocente)}) as llegadatardejustificada,
            (SELECT COUNT(*) FROM asistenciadocente WHERE mediafalta= true and iddocentexmateria = ${Number(idDocente)}) as mediafalta,
            (SELECT COUNT(*) FROM asistenciadocente WHERE mediafaltajustificada= true and iddocentexmateria = ${Number(idDocente)}) as mediafaltajustificada
        FROM asistenciadocente as a
        where (TO_DATE(creadoen,'DD/MM/YYYY') between  TO_DATE(${fechaInicio},'DD/MM/YYYY') and TO_DATE(${fechaFin},'DD/MM/YYYY') ) and iddocentexmateria = ${Number(idDocente)}
        group by a.iddocentexmateria`

        var presente = JSON.stringify(conteo, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        let present = JSON.parse(presente)
        return present
    } catch (error) {
        console.error(error);
    }
}


export async function TraerAsistencias(options) {
    try {
        const asistencias = await Prisma.newPrisma.asistenciadocente.findMany(options)
        return asistencias
    } catch (error) {
        console.log(error);
    }
}

export async function DetalleAsistencia(id) {
    try {
        const asistencia = await Prisma.newPrisma.asistenciadocente.findUnique({
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
    }
}

export async function updateAsistencia(id, presente = false, ausente = false, ausenteJustificado = false, llegadaTarde = false, llegadaTardeJustificada = false, mediaFalta = false, mediaFaltaJustificada = false, motivo = "", idUsuario) {
    try {
        const asistencia = await Prisma.newPrisma.asistenciadocente.update({
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

