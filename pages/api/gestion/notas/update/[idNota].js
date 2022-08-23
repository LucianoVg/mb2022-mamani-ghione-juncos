import { updateNota } from "../../../../../servicios/notas"

export default async function handler(
    req,
    res
) {
    try {
        const {idNota, newNota} = req.body
        const notas = await updateNota(Number.parseInt(idNota), Number.parseInt(newNota))
        return res.status(200).json(notas)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
