import { DetalleAsistencia } from "../../../../../servicios/asistencia_docente";

export default async function handler(
    req,
    res
) {
    try {
        const { id } = req.query
        const detalle = await DetalleAsistencia(id)
        return res.status(200).json(detalle)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mensaje: error.message })
    }
}