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
            idCurso: '',
            nombreAlumno: '',
            apellidoAlumno: ''
        }
        if (params) {
            switch (params.length) {
                case 1:
                    queryParams.idTrimestre = params[0]
                    break;
                case 2:
                    queryParams.idTrimestre = params[0]
                    queryParams.idMateria = params[1]
                    break;
                case 3:
                    queryParams.idTrimestre = params[0]
                    queryParams.idMateria = params[1]
                    queryParams.idCurso = params[2]
                    break;
                case 4:
                    queryParams.idTrimestre = params[0]
                    queryParams.idMateria = params[1]
                    queryParams.idCurso = params[2]
                    queryParams.nombreAlumno = params[3]
                    break;
                case 5:
                    queryParams.idTrimestre = params[0]
                    queryParams.idMateria = params[1]
                    queryParams.idCurso = params[2]
                    queryParams.nombreAlumno = params[3]
                    queryParams.apellidoAlumno = params[4]
                    break;
            }
        }

        console.log(queryParams);

        const notas = await TraerNotas(queryParams.idTrimestre, queryParams.idMateria, queryParams.idCurso, queryParams.nombreAlumno, queryParams.apellidoAlumno)

        return res.status(200).json(notas)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
