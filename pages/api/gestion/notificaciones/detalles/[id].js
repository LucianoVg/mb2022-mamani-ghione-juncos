import { DetalleNotificacion } from "../../../../../servicios/notificaciones";

export default async function handler(
    req,
    res
) {
    try {
        const { id } = req.query
        const detalle = await DetalleNotificacion(id)
        return res.status(200).json(detalle)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}