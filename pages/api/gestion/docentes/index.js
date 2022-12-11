import { traerDocentes } from "../../servicios/docentes";

export default async function handler(req, res) {
    try {
        const docentes = await traerDocentes()
        return res.status(200).json(docentes)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}