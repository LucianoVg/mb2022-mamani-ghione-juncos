import { guardarPortadas } from "../../../../servicios/ficha_institucional"

export default async function handler(
    req,
    res
) {
    if (req.method === 'POST') {
        const { nombre, url, fichaInstitucionalId } = req.body
        const portadas = await guardarPortadas(nombre, url, Number.parseInt(fichaInstitucionalId))
        return res.status(200).json(portadas)
    }
}