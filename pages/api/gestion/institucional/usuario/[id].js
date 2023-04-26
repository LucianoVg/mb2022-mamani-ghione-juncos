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
        const { id } = req.query
        if (req.method === 'GET') {
            const fichaInstitucional = await traerFichaInstitucional(id !== undefined ? id : 0)
            return res.status(200).json(fichaInstitucional)
        }

    } catch (error) {
        return res.status(400).send(error)
    }
}

export async function traerFichaInstitucional(id = 0) {
    const fichaInstitucional = id !== 0 ? await db.fichainstitucional.findFirst({
        where: {
            OR: [
                { id: id },
                { idusuario: id }
            ]
        },
        include: {
            portadasficha: true
        }
    }) : await db.fichainstitucional.findMany({
        include: {
            portadasficha: true
        }
    })
    return fichaInstitucional
}