import { generarSancion, traerSanciones } from "../../../../servicios/sanciones"

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const sanciones = await traerSanciones()
            return res.status(200).json(sanciones)
        }
        if (req.method === 'POST') {
            const { idUsuario, idAlumno, idCurso, idTipoSancion, motivo, fecha } = req.body
            const sancion = await generarSancion(
                Number.parseInt(idUsuario),
                Number.parseInt(idAlumno),
                Number.parseInt(idCurso),
                motivo,
                Number.parseInt(idTipoSancion),
                fecha)

            return res.status(200).json(sancion)
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}