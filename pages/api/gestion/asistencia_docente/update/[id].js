import { updateAsistencia } from "../../../../../servicios/asistencia_docente";

export default async function handler(req, res) {
    try {
        const { id } = req.query
        if (req.method === 'PUT') {
            const { presente, ausente, ausenteJustificado, llegadaTarde, llegadaTardeJustificada, mediaFalta, mediaFaltaJustificada, motivo, idUsuario } = req.body

            const asistencia = await updateAsistencia(id, presente, ausente, ausenteJustificado, llegadaTarde, llegadaTardeJustificada, mediaFalta, mediaFaltaJustificada, motivo, idUsuario)
            return res.status(200).json(asistencia)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}