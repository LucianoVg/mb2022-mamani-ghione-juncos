import NextCors from "nextjs-cors";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            const notificaciones = await ListarNotificaciones()
            return res.status(200).json(notificaciones)
        }
        return res.status(401).json({ mensaje: 'Metodo no permitido' })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}
async function ListarNotificaciones() {
    try {
        const listado = await db.notificacion.findMany({
            include: {
                usuario: {
                    include: {
                        rol: true
                    }
                }
            },
            orderBy: {
                id: "desc"
            }
        })

        return listado
    } catch (error) {
        console.log(error);
    }
}