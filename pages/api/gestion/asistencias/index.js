import { TraerAsistencias } from "../../../../servicios/asistencia";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const asistencias = await TraerAsistencias()
            return res.status(200).json(asistencias)
        } else {
            return res.status(401).json({ mensaje: 'Metodo no permitido' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}