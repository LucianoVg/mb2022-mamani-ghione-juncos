import guardarMaterialEstudio from "../../servicios/material_estudio"

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { titulo, fecha, url, idCurso, idMateria, idTrimestre, idUsuario } = req.body
            const materialEstudio = await guardarMaterialEstudio(titulo, url, fecha, idCurso, idMateria, idTrimestre, idUsuario)
            return res.status(200).json(materialEstudio)
        } else {
            return res.status(401).json({ mensaje: 'Metodo no permitido' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}