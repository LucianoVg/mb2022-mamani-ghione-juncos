import { guardarFichaInstitucional, traerFichaInstitucional } from "../../../../servicios/ficha_institucional";

export default async function handler(req, res) {
    try {
        const { id } = req.query
        if (req.method === 'PUT') {

            const { nombreInstitucion, ubicacion, tipoInstitucion, descripcion, telefono1, telefono2, oficina1, oficina2, mail, idUsuario } = req.body

            const ficha = await guardarFichaInstitucional(Number.parseInt(id), nombreInstitucion, ubicacion, Boolean(tipoInstitucion), descripcion, telefono1, telefono2, oficina1, oficina2, mail, idUsuario)

            return res.status(200).json(ficha)
        }
        if (req.method === 'GET') {
            const fichaInstitucional = await traerFichaInstitucional(id !== undefined ? Number.parseInt(id) : 0)

            return res.status(200).json(fichaInstitucional)
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
}