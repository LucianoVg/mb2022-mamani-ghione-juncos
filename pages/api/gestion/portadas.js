import { guardarPortadas } from "../../../servicios/ficha_institucional"

export default async function handler(
    req,
    res
) {
    if (req.method === 'POST') {
        const { nombre, url, fichaInstitucionalId } = req.body
        guardarPortadas(0, nombre, url, Number.parseInt(fichaInstitucionalId))
        return res.status(200).json({ mensaje: 'Portadas guardadas' })
    }
}