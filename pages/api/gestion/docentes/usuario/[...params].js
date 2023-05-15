import NextCors from "nextjs-cors";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ["GET"],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        let { params } = req.query;

        //  console.log(params[0], params[1]);

        let options = {
            include: {
                usuario: true,
                materiaxcursoxdivision: {
                    include: {
                        materia: true,
                        cursoxdivision: {
                            include: {
                                curso: true,
                                division: true,
                            },
                        },
                    },
                },
            },
        };
        let AND = [];

        if (params[1]=== "") {
            AND.push({
                usuario: {
                    id: Number(params[0]),
                },
            });
        }


        if (params[1]) {
            AND.push({
                materiaxcursoxdivision: {
                    materia: {
                        id: Number(params[0]),
                    }
                },
            });
            AND.push({
                materiaxcursoxdivision: {
                    cursoxdivision: {
                        division: {
                            division: params[1],
                        },
                    },
                },
            });
        }

        options = {
            ...options,
            where: { AND: AND },
        };

        const docente = await traerDocente(options);
        console.log("Docente:", docente);
        return res.status(200).json(docente);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export async function traerDocente(options) {
    try {
        const docente = await db.docentexmateria.findFirst(options);
        return docente;
    } catch (error) {
        console.log(error);
    }
}
