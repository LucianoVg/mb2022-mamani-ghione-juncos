import { traerFichaInstitucional } from "../../../../../servicios/ficha_institucional"

export default async function handler(req, res) {
    try {
        const { id } = req.query
        if (req.method === 'GET') {
            const fichaInstitucional = await traerFichaInstitucional(id !== undefined ? Number.parseInt(id) : 0)

            return res.status(200).json(fichaInstitucional)
        }

    } catch (error) {
        return res.status(400).send(error)
    }
}