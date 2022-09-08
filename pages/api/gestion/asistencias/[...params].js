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
            idCurso: 0
        }
      
        queryParams.idCurso = Number.parseInt(params[2])

        if (params.length > 3) {
            queryParams.alumno = params[2]
            queryParams.idCurso = Number.parseInt(params[3])
        }

        console.log(queryParams);

        const asistencias = await TraerAsistencias(queryParams.alumno, queryParams.idCurso)

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