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
            const cursoXDivision = await traerCursosXDivision()
            return res.status(200).json(cursoXDivision)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

export async function traerCursosXDivision() {
    try {
        const cursosXDivision = await db.cursoxdivision.findMany({
            select: {
                id: true,
                curso: {
                    select: {
                        id: true,
                        nombre: true
                    }
                },
                division: {
                    select: {
                        id: true,
                        division: true
                    }
                }
            },
            orderBy: {
                curso: {
                    nombre: 'asc'
                }
            }
        })
        return cursosXDivision
    } catch (error) {
        console.log(error);
    }
}