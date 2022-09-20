import NextCors from "nextjs-cors/dist";
import { TraerNotas } from "../../../../servicios/notas";

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { params } = req.query
        const queryParams = {
            idTrimestre: '',
            idMateria: '',
            alumno: '',
            idCurso: ''
        }
        queryParams.idTrimestre = params[0]
        queryParams.idMateria = params[1]
        queryParams.idCurso = params[2]

        if (params.length > 3) {
            queryParams.alumno = params[2]
            queryParams.idCurso = params[3]
        }

        console.log(queryParams);

        const notas = await TraerNotas(queryParams.idTrimestre, queryParams.idMateria, queryParams.alumno, queryParams.idCurso)

        return res.status(200).json(notas)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
