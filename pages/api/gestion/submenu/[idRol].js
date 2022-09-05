import { FiltrarMenu } from "../../../../servicios/menu";

export default async function handler(
    req,
    res
) {
    try {
        const { idRol } = req.query
        const menuXrol = await FiltrarMenu(Number.parseInt(idRol))
        return res.status(200).json(menuXrol)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
