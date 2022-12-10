import { traerDocente } from "../../servicios/docentes";

export default async function handler(req, res) {
    try {
        const { legajo } = req.query
        const docente = await traerDocente(legajo)
        console.log(docente);
        return res.status(200).json(docente)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}