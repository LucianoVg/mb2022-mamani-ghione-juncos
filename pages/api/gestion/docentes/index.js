import NextCors from "nextjs-cors";
import { db } from "../../../../prisma";
import { truncateSync } from "fs";

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

export async function traerDocentes() {
    try {
        const docente = await db.usuario.findMany({
            include: {
                docentexmateria: {
                    include: {
                        materiaxcursoxdivision: {
                            include:{
                                materia: true,
                                cursoxdivision: {
                                    include: {
                                        curso: true,
                                        division: truncateSync
                                    }
                                }
                            }
                        }
                    }
                }
            },
            where: {
                AND: [
                    {
                        idrol:1
                    },
                    {
                        activo: true
                    }
                ]
            }
        })
        // console.log(docente);
        return docente
    } catch (error) {
        console.log(error);
    }
}