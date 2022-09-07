import NextCors from "nextjs-cors/dist";
import { guardarFichaInstitucional, traerFichaInstitucional } from "../../../../servicios/ficha_institucional"

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'POST'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'POST') {
            const { nombreInstitucion, ubicacion, tipoInstitucion, descripcion, telefono1, telefono2, oficina1, oficina2, mail, idUsuario } = req.body

            const guardado = await guardarFichaInstitucional(0, nombreInstitucion, ubicacion, Boolean(tipoInstitucion), descripcion, telefono1, telefono2, oficina1, oficina2, mail, Number.parseInt(idUsuario))

            return res.status(200).json(guardado)
        }
        if (req.method === 'GET') {
            const ficha = await traerFichaInstitucional(0)
            return res.status(200).json(ficha)
        }
    } catch (error) {
        console.error(error);
        return res.status(200).json(error)
    }
}