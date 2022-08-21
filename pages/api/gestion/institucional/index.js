import { guardarFichaInstitucional, traerFichaInstitucional } from "../../../../servicios/ficha_institucional"

export default async function handler(
    req,
    res
) {
    if (req.method === 'POST') {
        const { nombreInstitucion, ubicacion, tipoInstitucion, descripcion, telefono1, telefono2, oficina1, oficina2, mail, idUsuario } = req.body

        const guardado = await guardarFichaInstitucional(0, nombreInstitucion, ubicacion, Boolean(tipoInstitucion), descripcion, telefono1, telefono2, oficina1, oficina2, mail, Number.parseInt(idUsuario))

        return res.status(200).json(guardado)
    }
}