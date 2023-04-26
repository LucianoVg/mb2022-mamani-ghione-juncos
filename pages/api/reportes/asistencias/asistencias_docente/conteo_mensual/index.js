import NextCors from "nextjs-cors/dist";
import { db } from "../../../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            let { idDocente, mes } = req.query
            console.log(idDocente, mes);
            const conteo = await ConteoAsistenciasMensual(idDocente, mes)
            return res.status(200).json(conteo)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}


export async function ConteoAsistenciasMensual(idDocente, mes) {
    let dia = Number(mes) === 3 || Number(mes) === 5 || Number(mes) === 8 || Number(mes) === 10 || Number(mes) === 12 ? 31 : 30

    let fechaInicio = `01/${mes < 10 ? '0' + mes : mes}/${new Date().getFullYear()}`
    let fechaFin = `${dia}/${mes < 10 ? '0' + mes : mes}/${new Date().getFullYear()}`
    try {
        console.log(fechaInicio, fechaFin);
        const conteo = await db.$queryRaw`SELECT a.iddocentexmateria,
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