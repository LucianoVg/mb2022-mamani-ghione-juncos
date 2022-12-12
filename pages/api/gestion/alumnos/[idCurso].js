import traerAlumnos from "../../servicios/alumnos";

export default async function handler(req, res) {
    try {
        const { idCurso } = req.query
        const alumnos = await traerAlumnos(idCurso)
        return res.status(200).json(alumnos)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}