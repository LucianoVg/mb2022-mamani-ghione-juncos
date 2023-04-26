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
            const division = await traerDivision()
            return res.status(200).json(division)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

export async function traerDivision() {
    try {
        const division = await db.division.findMany({
            orderBy: {
                division: 'asc'
            }
        })
        return division
    } catch (error) {
        console.log(error);
    }
}