import { ListarNotificaciones } from "../../../../servicios/notificaciones";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { idUsuario } = req.query
            const notificaciones = await ListarNotificaciones(idUsuario)
            return res.status(200).json(notificaciones)
        }
        return res.status(401).json({ mensaje: 'Metodo no permitido' })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}