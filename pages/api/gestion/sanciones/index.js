import { traerSanciones } from "../../../../servicios/sanciones"

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const sanciones = await traerSanciones()
            return res.status(200).json(sanciones)
        }
        if (req.method === 'POST') {

        }
    } catch (error) {
        return res.status(400).send(error)
    }
}