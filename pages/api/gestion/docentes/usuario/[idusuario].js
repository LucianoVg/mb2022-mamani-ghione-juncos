import NextCors from "nextjs-cors";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { idusuario } = req.query
        const docente = await traerDocente(idusuario)
        console.log(docente);
        return res.status(200).json(docente)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

export async function traerDocente(idusuario) {
    try {
        const docente = await db.docentexmateria.findFirst({
            include: {
                usuario: true,
                materiaxcursoxdivision: {
                    include: {
                        materia: true,
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
                usuario: {
                    id: Number(idusuario)
                }
            }
        })
        return docente
    } catch (error) {
        console.log(error);
    }
}