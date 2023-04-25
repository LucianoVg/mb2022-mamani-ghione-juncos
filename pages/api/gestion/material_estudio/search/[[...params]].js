import { descargarMaterialEstudio } from "../../../servicios/material_estudio";

export default async function handler(req, res) {
    try {
        const { idTrimestre, idCurso, idMateria } = req.query
        const material_estudio = await descargarMaterialEstudio(idTrimestre, idCurso, idMateria)
        return res.status(200).json(material_estudio)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}