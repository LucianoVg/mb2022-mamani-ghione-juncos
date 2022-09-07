import NextCors from "nextjs-cors/dist";
import { editarPortadas, traerPortadas } from "../../../../servicios/ficha_institucional";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'PUT'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query
        if (req.method === 'PUT') {
            const { nombre, url, fichaInstitucionalId } = req.body
            const portada = await editarPortadas(Number.parseInt(id), nombre, url, Number.parseInt(fichaInstitucionalId))
            return res.status(200).json(portada)
        }
        if (req.method === 'GET') {
            const portadas = await traerPortadas(Number.parseInt(id))
            return res.status(200).json(portadas)
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json(error)
    }
}