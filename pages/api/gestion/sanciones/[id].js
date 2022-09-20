import NextCors from "nextjs-cors/dist";
import { actualizarSancion, obtenerSancion } from "../../../../servicios/sanciones"

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'PUT'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query
        if (req.method === 'GET') {
            const sancion = await obtenerSancion(id)
            if (sancion) {
                return res.status(200).json(sancion)
            }
            return res.status(404).json({ mensaje: 'Sancion no encontrada' })
        } else {
            const { idUsuario,
                idCurso,
                idAlumno,
                idTipoSancion,
                motivo,
                fecha
            } = req.body

            const sancion = await actualizarSancion(
                id,
                idUsuario,
                idCurso !== undefined ? idCurso : '',
                idAlumno !== undefined ? idAlumno : '',
                idTipoSancion,
                motivo,
                fecha)

            return res.status(200).json(sancion)
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}