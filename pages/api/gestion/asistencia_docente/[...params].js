import { FiltrarAsistencias } from "../../../../servicios/asistencia_docente";

export default async function handler(
    req,
    res
) {
    try {
        const { params } = req.query
        console.log(params);
        const queryParams = {
            alumno: undefined,
            idCurso: undefined,
            documento: undefined,
            fecha: undefined
        }

        if (params) {
            switch (params.length) {
                case 1:
                    queryParams.fecha = params[0]
                    break;
                case 2:
                    queryParams.fecha = params[0]
                    queryParams.idCurso = params[1]
                    break;
                case 3:
                    queryParams.fecha = params[0]
                    queryParams.idCurso = params[1]
                    queryParams.alumno = params[2]
                    break;
                case 4:
                    queryParams.fecha = params[0]
                    queryParams.idCurso = params[1]
                    queryParams.alumno = params[2]
                    queryParams.documento = params[3]
                    break;
            }
        }

        console.log(queryParams);

        const asistencias = await FiltrarAsistencias(queryParams.alumno || "", queryParams.idCurso || "", queryParams.documento || "", queryParams.fecha || "")

        return res.status(200).json(asistencias)
    } catch (error) {
        console.error(error);
        return res.status(200).json({ mensaje: error.message })
    }
}