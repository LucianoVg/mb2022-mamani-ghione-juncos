import { actualizarExamen, borrarExamen } from "../../servicios/examenes"

export default async function handler(req, res) {
    try {
        const { id } = req.query
        if (req.method === 'PUT') {
            const { titulo, fechaInicio, fechaFin, idUsuario } = req.body
            const examen = await actualizarExamen(id, titulo, fechaInicio, fechaFin, idUsuario)
            return res.status(200).json(examen)
        } else if (req.method === 'DELETE') {
            const examen = await borrarExamen(id)
            return res.status(200).json(examen)
        } else {
            return res.status(401).json({ mensaje: 'Metodo no permitido' })
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}