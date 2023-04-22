import { DetalleAsistencia } from "../../../servicios/asistencia";

export default async function handler(
    req,
    res
) {
    try {
        const { id } = req.query
        const detalles = await DetalleAsistencia(id)
        return res.status(200).json(detalles)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}