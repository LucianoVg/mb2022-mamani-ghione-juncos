import { traerSanciones } from "../../../../../servicios/sanciones"

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { params } = req.query
            const idCurso = Number.parseInt(params[0])
            const idAlumno = Number.parseInt(params[1])

            const sanciones = await traerSanciones(idCurso, idAlumno)
            return res.status(200).json(sanciones)
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send(error)
    }
}