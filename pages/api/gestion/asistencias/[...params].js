import { NextApiRequest, NextApiResponse } from "next";
import { TraerAsistencias } from "../../../../servicios/asistencia";

export default async function handler(
    req,
    res
) {
    try {
        const { params } = req.query

        const queryParams = {
            alumno: '',
            idCurso: 0,
            documento: '',
            desde: '',
            hasta: ''
        }

        if (params.length === 3) {
            queryParams.idCurso = Number.parseInt(params[0])
            queryParams.desde = params[1]
            queryParams.hasta = params[2]
        } else {
            queryParams.alumno = params[0]
            queryParams.idCurso = Number.parseInt(params[1])
            queryParams.documento = params[2]
            queryParams.desde = params[3]
            queryParams.hasta = params[4]
        }

        const asistencias = await TraerAsistencias(queryParams.alumno, queryParams.idCurso, queryParams.documento, queryParams.desde, queryParams.hasta)

        return res.status(200).json(asistencias)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}

// export default async function handler(
//     req,
//     res
// ) {
//     try {
//         const cursos = await TraerAsistencias()
//         return res.status(200).json(cursos)
//     } catch (error) {
//         return res.status(200).json({ mensaje: error.message })
//     }
// }