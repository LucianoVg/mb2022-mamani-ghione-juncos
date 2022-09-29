import { guardarFechaExamen, traerFechaExamenes } from "../../../../servicios/examenes";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const fechasExamen = await traerFechaExamenes()
            return res.status(200).json(fechasExamen)
        }
        if (req.method === 'POST') {
            const { fecha, idCurso, idMateria, idUsuario } = req.body
            const fechaExamen = await guardarFechaExamen(fecha, idCurso, idMateria, idUsuario)
            return res.status(200).json(fechaExamen)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}