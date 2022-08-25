import { TraerNotas } from "../../../../servicios/notas";
import { ListarMaterias } from "../../../../servicios/notas";
export default async function handler(
    req,
    res
) {
    try {
<<<<<<< Updated upstream:pages/api/gestion/notas/[idTrimestre].js
        const { idTrimestre } = req.query
        const {materia,curso, alumno} = req.body
        const notas = await TraerNotas(Number.parseInt(idTrimestre, materia, curso, alumno  ))
                return res.status(200).json(notas)
=======
        const { params } = req.query
        console.log(params);
        const notas = []
        // await TraerNotas(Number.parseInt(params[0]), Number.parseInt(params[1]), params[2], Number.parseInt(params[3]))

        const materias = await ListarMaterias()
        return res.status(200).json(notas)
>>>>>>> Stashed changes:pages/api/gestion/notas/[...params].js
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
