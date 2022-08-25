import { NextApiRequest, NextApiResponse } from "next";
import { TraerNotas } from "../../../../servicios/notas";
import { ListarMaterias } from "../../../../servicios/notas";
export default async function handler(
    req,
    res
) {
    try {
        const { idTrimestre, idMateria, idCurso, alumno } = req.query
        const notas = await TraerNotas(Number.parseInt(idTrimestre, idMateria,idCurso,alumno ))
        const materias = await ListarMaterias()
        return res.status(200).json(notas)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
