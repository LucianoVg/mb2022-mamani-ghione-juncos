import { traerTrimestres } from "../../servicios/trimestres";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const trimestres = await traerTrimestres()
            return res.status(200).json(trimestres)
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send(error)
    }
}