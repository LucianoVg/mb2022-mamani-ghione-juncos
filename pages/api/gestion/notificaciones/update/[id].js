import { ActualizarNotificacion } from "../../../../../servicios/notificaciones"

export default async function handler(
    req,
    res
) {
    try {
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