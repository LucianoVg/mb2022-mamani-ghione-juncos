import NextCors from "nextjs-cors";
import { db } from "../../../../../prisma";

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query
        const detalle = await DetalleAsistencia(id)
        return res.status(200).json(detalle)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mensaje: error.message })
    }
}

export async function DetalleAsistencia(id) {
    try {
        const asistencia = await db.asistenciadocente.findUnique({
            include: {
                usuario: true,
                docentexmateria: {
                    include: {
                        usuario: true
                    }
                }
            },
            where: {
                id: Number(id)
            }

        })
        console.log(asistencia);
        return asistencia
    } catch (error) {
        console.log(error);
    }
}