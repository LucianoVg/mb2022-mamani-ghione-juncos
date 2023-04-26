import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const materias = await ListarMaterias()
        return res.status(200).json(materias)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}

export async function ListarMaterias(idCurso) {
    try {

        const materias = idCurso ? await db.materia.findMany({
            include: {
                curso: true
            },
            where: {
                idcurso: Number(idCurso)
            },
            orderBy: {
                id: "asc"
            }
        }) : await db.materia.findMany({
            include: {
                curso: true
            },
            orderBy: {
                id: "asc"
            }
        })
        return materias
    } catch (error) {
        console.error(error);
    }
}