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
            idTrimestre: 0,
            idMateria: '',
            idCurso: '',
            nombreAlumno: '',
            apellidoAlumno: ''
        }

        if (params) {
            queryParams.idTrimestre = params[0] !== 'undefined' && params[0]
            queryParams.idMateria = params[1] !== 'undefined' && params[1]
            queryParams.idCurso = params[2] !== 'undefined' && params[2]
            console.log(queryParams);
        }

        const notas = await TraerNotas(queryParams.idTrimestre, queryParams.idMateria, queryParams.idCurso, queryParams.nombreAlumno, queryParams.apellidoAlumno)
        return res.status(200).json(notas)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
