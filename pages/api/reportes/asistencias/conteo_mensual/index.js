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
            let { idAlumno, mes } = req.query
            console.log("ID Alumno y mes: ", idAlumno, mes);
            const conteo = await ConteoAsistenciasMensual(idAlumno, mes)
            return res.status(200).json(conteo)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}


export async function ConteoAsistenciasMensual(idAlumno, mes) {
    try {
        let dia = Number(mes) === 3 || Number(mes) === 5 || Number(mes) === 8 || Number(mes) === 10 || Number(mes) === 12 ? 31 : 30

        let fechaInicio = `01/${mes < 10 ? '0' + mes : mes}/${new Date().getFullYear()}`
        let fechaFin = `${dia}/${mes < 10 ? '0' + mes : mes}/${new Date().getFullYear()}`

        const conteo = await db.$queryRaw`SELECT a.idalumnoxcursoxdivision,
    (SELECT COUNT(*) FROM asistencia WHERE presente = true  and idalumnoxcursoxdivision = ${Number(idAlumno)}
    and (TO_DATE(creadoen,'DD/MM/YYYY') between  TO_DATE(${fechaInicio},'DD/MM/YYYY') 
    and TO_DATE(${fechaFin},'DD/MM/YYYY') ) ) as presente,
    
    (SELECT COUNT(*) FROM asistencia WHERE ausente = true  and idalumnoxcursoxdivision = ${Number(idAlumno)}
    and (TO_DATE(creadoen,'DD/MM/YYYY') between  TO_DATE(${fechaInicio},'DD/MM/YYYY') 
    and TO_DATE(${fechaFin},'DD/MM/YYYY') ) ) as ausente,
   
    (SELECT COUNT(*) FROM asistencia WHERE ausentejustificado = true and idalumnoxcursoxdivision = ${Number(idAlumno)}
    and (TO_DATE(creadoen,'DD/MM/YYYY') between  TO_DATE(${fechaInicio},'DD/MM/YYYY') 
    and TO_DATE(${fechaFin},'DD/MM/YYYY') ) ) as ausentejustificado ,
   
    (SELECT COUNT(*) FROM asistencia WHERE  llegadatarde= true and idalumnoxcursoxdivision = ${Number(idAlumno)}
    and (TO_DATE(creadoen,'DD/MM/YYYY') between  TO_DATE(${fechaInicio},'DD/MM/YYYY') 
    and TO_DATE(${fechaFin},'DD/MM/YYYY') ) ) as llegadatarde,
   
    (SELECT COUNT(*) FROM asistencia WHERE mediafalta= true and idalumnoxcursoxdivision = ${Number(idAlumno)}
    and (TO_DATE(creadoen,'DD/MM/YYYY') between  TO_DATE(${fechaInicio},'DD/MM/YYYY') 
    and TO_DATE(${fechaFin},'DD/MM/YYYY') ) ) as mediafalta
FROM asistencia as a
-- where (TO_DATE(creadoen,'DD/MM/YYYY') between  TO_DATE(${fechaInicio},'DD/MM/YYYY') 
-- and TO_DATE(${fechaFin},'DD/MM/YYYY') ) 
-- and idalumnoxcursoxdivision = ${Number(idAlumno)}
group by a.idalumnoxcursoxdivision`

        var presente = JSON.stringify(conteo, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        let present = JSON.parse(presente)
        return present

    } catch (error) {
        console.error(error);
    }
}