import NextCors from "nextjs-cors/dist";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            let { idAlumno } = req.query
            console.log("ID Alumno: ", idAlumno);
            const conteo = await ConteoAsistenciasAnual(idAlumno)
            return res.status(200).json(conteo)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

async function ConteoAsistenciasAnual(idAlumno) {
    try {
        const conteo = await db.$queryRaw`SELECT a.idalumnoxcursoxdivision,
    (SELECT COUNT(*) FROM asistencia WHERE presente = true  and idalumnoxcursoxdivision = ${Number(idAlumno)}) as presente,
    (SELECT COUNT(*) FROM asistencia WHERE ausente = true  and idalumnoxcursoxdivision = ${Number(idAlumno)}) as ausente,
    (SELECT COUNT(*) FROM asistencia WHERE ausentejustificado = true and idalumnoxcursoxdivision = ${Number(idAlumno)}) as ausentejustificado ,
    (SELECT COUNT(*) FROM asistencia WHERE  llegadatarde= true and idalumnoxcursoxdivision = ${Number(idAlumno)}) as llegadatarde,
    (SELECT COUNT(*) FROM asistencia WHERE mediafalta= true and idalumnoxcursoxdivision = ${Number(idAlumno)}) as mediafalta
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