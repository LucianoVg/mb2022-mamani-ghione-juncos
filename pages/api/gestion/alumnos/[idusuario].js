import { traerAlumno } from "../../servicios/alumnos";


export default async function handler(req, res) {
    try {
        const { idusuario } = req.query
        console.log(idusuario);
        const alumno = await traerAlumno(idusuario)
        return res.status(200).json(alumno)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}