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
        let { idUsuario, division } = req.query;

        console.log({ idUsuario, division });

        let options = {
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
        }
        let AND = [];

        if (idUsuario) {
            AND.push({
                usuario: {
                    id: Number(idUsuario)
                },
            },);
        }
        if (division) {
            AND.push({
                materiaxcursoxdivision:{
                    cursoxdivision: {
                        division: {
                            division: 'A'
                        }
                    }
                }
            },
            );
        }
        


        options = {
            ...options,
            where: { AND: AND },
        };

        const docente = await traerDocente(options)
        console.log(docente);
        return res.status(200).json(docente)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

export async function traerDocente(options) {
    try {
        const docente = await db.docentexmateria.findFirst(options)
        return docente
    } catch (error) {
        console.log(error);
    }
}