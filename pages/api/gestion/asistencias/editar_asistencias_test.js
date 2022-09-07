import { NextApiRequest, NextApiResponse } from "next";
import { TraerAsistenciasTest } from "../../../../servicios/asistencia";

export default async function handler(
    req,
    res
) {
    try {
        const cursos = await TraerAsistenciasTest()
        return res.status(200).json(cursos)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}