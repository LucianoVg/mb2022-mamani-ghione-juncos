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
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query
        const detalle = await DetalleNotificacion(id)
        return res.status(200).json(detalle)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
async function DetalleNotificacion(idNotificacion) {
    try {
        const notificacion = await db.notificacion.findUnique({
            include: {
                usuario: {
                    include: {
                        rol: true
                    }
                }
            },
            where: {
                id: Number(idNotificacion)
            }
        })
        console.log(notificacion);
        return notificacion
    } catch (error) {
        console.log(error);
    }
}