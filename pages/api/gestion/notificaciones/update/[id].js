import NextCors from "nextjs-cors";
import { db } from "../../../../../prisma";

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['PUT'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query
        if (req.method === 'PUT') {
            const { asunto, contenido, idUsuario, idNotificacionXUsuario } = req.body
            const actualizar = await ActualizarNotificacion(id, asunto, contenido, idUsuario, idNotificacionXUsuario)
            return res.status(200).json(actualizar)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

export async function ActualizarNotificacion(id, asunto, contenido, idUsuario) {
    try {
        const actualizar = await db.notificacion.update({
            data: {
                asunto: asunto,
                contenido: contenido,
                idusuario: Number(idUsuario),
            },
            where: {
                id: Number(id)
            }
        })
        return actualizar
    } catch (error) {
        console.log(error);
    }
}