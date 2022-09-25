import NextCors from "nextjs-cors/dist";
import { Prisma } from "../../../../servicios/prisma"

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'POST'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            const usuarios = await Prisma.newPrisma().usuario.findMany({
                include: {
                    rol: true
                }
            })
            return res.status(200).json(usuarios)
        } else {
            return res.status(500).send("Metodo No Permitido")
        }
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}