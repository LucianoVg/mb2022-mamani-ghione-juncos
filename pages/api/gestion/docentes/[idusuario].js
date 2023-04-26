import NextCors from "nextjs-cors";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { idusuario } = req.query
        const docentes = await traerDocentes(idusuario)
        return res.status(200).json(docentes)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

export async function traerDocentes(idusuario) {
    try {
        const docente = await db.docentexmateria.findMany({
            include: {
                materia: true,
                usuario: true
            },
            where: {
                usuario: {
                    id: {
                        not: Number(idusuario)
                    }
                }
            }
        })
        console.log(docente);
        return docente
    } catch (error) {
        console.log(error);
    }
}