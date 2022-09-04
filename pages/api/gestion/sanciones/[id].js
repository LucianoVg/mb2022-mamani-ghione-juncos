import { actualizarSancion, obtenerSancion } from "../../../../servicios/sanciones"

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { id } = req.query
            const sancion = await obtenerSancion(Number.parseInt(id))
            if (sancion) {
                return res.status(200).json(sancion)
            }
            return res.status(404).json({ mensaje: 'Sancion no encontrada' })
        } else {
            const { id } = req.query
            const { idUsuario,
                idCurso,
                idAlumno,
                idTipoSancion,
                motivo,
                fecha
            } = req.body

            const sancion = await actualizarSancion(
                Number.parseInt(id),
                Number.parseInt(idUsuario),
                Number.parseInt(idCurso),
                Number.parseInt(idAlumno),
                Number.parseInt(idTipoSancion),
                motivo,
                fecha)

            return res.status(200).json(sancion)
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}