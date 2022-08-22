import { NextApiRequest, NextApiResponse } from "next";
import { TraerNotas } from "../../../servicios/notas";

export default async function handler(
    req,
    res
) {
    try {
        const { idRol } = req.query
        const menuXrol = await TraerNotas()
        return res.status(200).json(menuXrol)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
