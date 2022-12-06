import { updateAsistencia } from "../../../servicios/asistencia";

export default async function handler(req, res) {
    try {
        const { id } = req.query
        if (req.method === 'PUT') {
            const { presente, ausente, ausenteJustificado, llegadaTarde, llegadaTardeJustificada, mediaFalta, mediaFaltaJustificada, motivo, idUsuario } = req.body

            const asistencia = await updateAsistencia(Number(id), Boolean(presente), Boolean(ausente), Boolean(ausenteJustificado), Boolean(llegadaTarde), Boolean(llegadaTardeJustificada), Boolean(mediaFalta), Boolean(mediaFaltaJustificada), motivo, idUsuario)
            return res.status(200).json(asistencia)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}