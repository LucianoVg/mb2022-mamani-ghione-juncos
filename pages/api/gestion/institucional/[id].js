import NextCors from "nextjs-cors/dist";
import { guardarFichaInstitucional, traerFichaInstitucional } from "../../../../servicios/ficha_institucional";

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

            const { nombreInstitucion, ubicacion, tipoInstitucion, descripcion, telefono1, telefono2, oficina1, oficina2, mail, idUsuario } = req.body

            const ficha = await guardarFichaInstitucional(id, nombreInstitucion, ubicacion, tipoInstitucion, descripcion, telefono1, telefono2, oficina1, oficina2, mail, idUsuario)

            return res.status(200).json(ficha)
        }
        if (req.method === 'GET') {
            const fichaInstitucional = await traerFichaInstitucional(id !== undefined ? id : '')

            return res.status(200).json(fichaInstitucional)
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
}