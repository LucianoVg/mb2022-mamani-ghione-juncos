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
        const conteo = await db.$queryRaw`SELECT a.iddocente,
    (SELECT COUNT(*) FROM asistenciadocente a WHERE presente = true  and iddocente = ${Number(idDocente)}) as presente,
    (SELECT COUNT(*) FROM asistencia WHERE ausente = true  and iddocente = ${Number(idDocente)}) as ausente,
    (SELECT COUNT(*) FROM asistencia WHERE ausentejustificado = true and iddocente = ${Number(idDocente)}) as ausentejustificado ,
    (SELECT COUNT(*) FROM asistencia WHERE  llegadatarde= true and iddocente = ${Number(idDocente)}) as llegadatarde,
    (SELECT COUNT(*) FROM asistencia WHERE mediafalta= true and iddocente = ${Number(idDocente)}) as mediafalta
   FROM asistenciadocente as a
where iddocente = ${Number(idDocente)}
group by a.iddocente`

        var presente = JSON.stringify(conteo, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        let present = JSON.parse(presente)
        return present

    } catch (error) {
        console.error(error);
    }
}