import { NextApiRequest, NextApiResponse } from "next";
import { TraerNotas } from "../../../../servicios/notas";
import { ListarMaterias } from "../../../../servicios/notas";
export default async function handler(
    req,
    res
) {
    try {
        const materias = await ListarMaterias()
        return res.status(200).json(materias)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
