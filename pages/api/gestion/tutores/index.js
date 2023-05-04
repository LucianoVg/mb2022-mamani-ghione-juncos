import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            const tutores = await traerTutores()
            return res.status(200).json(tutores)
        }
    } catch (error) {
        console.error(error);
    }
}

async function traerTutores() {
    try {
        const tutores = await db.alumnoxcursoxdivision.findMany({
            include: {
                tutor: true,
                usuario: true
            },
            orderBy: {
                tutor: {
                    apellido: 'asc'
                }
            },
            where: {
                AND: [
                    {
                        tutor: {
                            idrol: 6
                        }
                    },
                    {
                        tutor: {
                            activo: true
                        }
                    },
                    {
                        usuario: {
                            activo: true
                        }
                    }

                ]
            }

        });
        return tutores
    } catch (error) {
        console.error(error);
    }
}