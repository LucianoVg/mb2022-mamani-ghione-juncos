import { DetalleAsistencia } from "../../../../../servicios/asistencia";

export default async function handler(
    req,
    res
) {
    try {
        const { id } = req.query
        const detalle = await DetalleAsistencia(Number(id))
        return res.status(200).json(detalle)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}