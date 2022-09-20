import NextCors from "nextjs-cors/dist";
import { guardarPortadas } from "../../../../servicios/ficha_institucional"

export default async function handler(
    req,
    res
) {
    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === 'POST') {
        const { nombre, url, fichaInstitucionalId } = req.body
        const portadas = await guardarPortadas(nombre, url, fichaInstitucionalId)
        return res.status(200).json(portadas)
    }
}