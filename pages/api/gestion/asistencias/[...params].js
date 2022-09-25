import { TraerAsistencias } from "../../../../servicios/asistencia";

export default async function handler(
    req,
    res
) {
    try {
        const { params } = req.query
        console.log(params);
        const queryParams = {
            alumno: '',
            idCurso: '',
            documento: '',
            fecha: ''
        }

        if (params) {
            switch (params.length) {
                case 1:
                    queryParams.fecha = params[0]
                    break;
                case 2:
                    queryParams.idCurso = params[0]
                    queryParams.fecha = params[1]
                    break;
                case 3:
                    queryParams.idCurso = params[0]
                    queryParams.fecha = params[1]
                    queryParams.alumno = params[2]
                    break;
                case 4:
                    queryParams.idCurso = params[0]
                    queryParams.fecha = params[1]
                    queryParams.alumno = params[2]
                    queryParams.documento = params[3]
                    break;
            }
        }

        console.log(queryParams);

        const asistencias = await TraerAsistencias(queryParams.alumno, queryParams.idCurso, queryParams.documento, queryParams.fecha)

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