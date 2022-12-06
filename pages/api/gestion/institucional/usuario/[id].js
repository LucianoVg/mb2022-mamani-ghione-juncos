import NextCors from "nextjs-cors/dist";
import { traerFichaInstitucional } from "../../../servicios/ficha_institucional"

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query
        if (req.method === 'GET') {
            const fichaInstitucional = await traerFichaInstitucional(id !== undefined ? id : '')
            return res.status(200).json(fichaInstitucional)
        }

    } catch (error) {
        return res.status(400).send(error)
    }
}