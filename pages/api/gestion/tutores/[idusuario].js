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
        const { idusuario } = req.query
        console.log(idusuario);
        const tutor = await traerTutor(idusuario)
        return res.status(200).json(tutor)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}

async function traerTutor(idusuario) {
    try {
        const tutor = await db.usuario.findFirst({
            where: {
                usuario: {
                    id: Number(idusuario)
                }
            }
        })
        return tutor
    } catch (error) {
        console.log(error);
    }
}