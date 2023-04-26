import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            const alumnos = await traerAlumnos()
            return res.status(200).json(alumnos)
        }
    } catch (error) {
        console.error(error);
    }
}

export async function traerAlumnos() {
    try {
        const alumnos = await db.alumnoxcursoxdivision.findMany({
            include: {
                cursoxdivision: {
                    include: {
                        curso: true,
                        division: true
                    }
                },
                usuario: true
            }
        });
        return alumnos
    } catch (error) {
        console.error(error);
    }
}