import NextCors from "nextjs-cors/dist";
import { db } from "../../../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            let { idDocente } = req.query
            console.log(idDocente);
            const conteo = await ConteoAsistenciasAnual(idDocente)
            return res.status(200).json(conteo)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

async function ConteoAsistenciasAnual(idDocente) {
    try {
        const conteo = await db.$queryRaw`SELECT a.iddocentexmateria,
    (SELECT COUNT(*) FROM asistenciadocente a WHERE presente = true  and iddocentexmateria = ${Number(idDocente)}) as presente,
    (SELECT COUNT(*) FROM asistencia WHERE ausente = true  and iddocentexmateria = ${Number(idDocente)}) as ausente,
    (SELECT COUNT(*) FROM asistencia WHERE ausentejustificado = true and iddocentexmateria = ${Number(idDocente)}) as ausentejustificado ,
    (SELECT COUNT(*) FROM asistencia WHERE  llegadatarde= true and iddocentexmateria = ${Number(idDocente)}) as llegadatarde,
    (SELECT COUNT(*) FROM asistencia WHERE llegadatardejustificada= true and idalumnoxcursoxdivision = ${Number(idDocente)}) as llegadatardejustificada,
    (SELECT COUNT(*) FROM asistencia WHERE mediafalta= true and iddocentexmateria = ${Number(idDocente)}) as mediafalta,
    (SELECT COUNT(*) FROM asistencia WHERE mediafaltajustificada= true and iddocentexmateria = ${Number(idDocente)}) as mediafaltajustificada
FROM asistencia as a
where iddocentexmateria = ${Number(idDocente)}
group by a.iddocentexmateria`

        var presente = JSON.stringify(conteo, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        let present = JSON.parse(presente)
        return present

    } catch (error) {
        console.error(error);
    }
}