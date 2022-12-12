import { descargarMaterialEstudio } from "../../servicios/material_estudio";

export default async function handler(req, res) {
    try {
        const { params } = req.query
        const material_estudio = await descargarMaterialEstudio(params[0], params[1])
        return res.status(200).json(material_estudio)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}