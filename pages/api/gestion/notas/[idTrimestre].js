import { NextApiRequest, NextApiResponse } from "next";
import { TraerNotas } from "../../../../servicios/notas";
import { ListarMaterias } from "../../../../servicios/notas";
export default async function handler(
    req,
    res
) {
    try {
        const { idTrimestre } = req.query
        const {materia,curso, alumno} = req.body
        const notas = await TraerNotas(Number.parseInt(idTrimestre, materia, curso, alumno  ))
                return res.status(200).json(notas)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
