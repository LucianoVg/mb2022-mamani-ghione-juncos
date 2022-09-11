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
            const sancion = await obtenerSancion(Number.parseInt(id))
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
                Number.parseInt(id),
                Number.parseInt(idUsuario),
                idCurso !== undefined ? Number.parseInt(idCurso) : 0,
                idAlumno !== undefined ? Number.parseInt(idAlumno) : 0,
                Number.parseInt(idTipoSancion),
                motivo,
                fecha)

            return res.status(200).json(sancion)
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}