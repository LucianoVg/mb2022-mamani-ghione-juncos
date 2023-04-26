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
            const trimestres = await traerTrimestres()
            return res.status(200).json(trimestres)
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send(error)
    }
}

async function traerTrimestres() {
    try {
        const trimestres = await db.trimestre.findMany()
        return trimestres
    } catch (error) {
        console.log(error);
    }
}