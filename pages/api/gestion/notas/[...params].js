import { TraerNotas } from "../../../../servicios/notas";

export default async function handler(
    req,
    res
) {
    try {
        const { params } = req.query
        const queryParams = {
            idTrimestre: 0,
            idMateria: 0,
            alumno: '',
            idCurso: 0
        }
        queryParams.idTrimestre = Number.parseInt(params[0])
        queryParams.idMateria = Number.parseInt(params[1])
        queryParams.idCurso = Number.parseInt(params[2])

        if (params.length > 3) {
            queryParams.alumno = params[2]
            queryParams.idCurso = Number.parseInt(params[3])
        }

        console.log(queryParams);

        const notas = await TraerNotas(queryParams.idTrimestre, queryParams.idMateria, queryParams.alumno, queryParams.idCurso)

        return res.status(200).json(notas)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
