import { NextApiRequest, NextApiResponse } from "next";
import { DetalleAsistencia } from "../../../../servicios/asistencia";

export default async function handler(
    req,
    res
) {
    try {
        const detalle = await DetalleAsistencia()
        return res.status(200).json(detalle)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}