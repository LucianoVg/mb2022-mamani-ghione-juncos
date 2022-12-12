import { ListarNotificacionesDeUsuario } from "../../../servicios/notificaciones"

export default async function handler(req, res) {
    const { id } = req.query
    try {
        const notificacionesXAlumno = await ListarNotificacionesDeUsuario(id)
        return res.status(200).json(notificacionesXAlumno)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}