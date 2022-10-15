import { ListarNotificacionesDeUsuario } from "../../../../../servicios/notificaciones";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { id } = req.query
            const notificaciones = await ListarNotificacionesDeUsuario(id)
            return res.status(200).json(notificaciones)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}