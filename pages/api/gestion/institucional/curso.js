import { TraerNotas } from "../../../../servicios/notas";
// import { ListarCurso } from "../../../../servicios/notas";
export default async function handler(
    req,
    res
) {
    try {
        // const cursos = await ListarCurso()
        // return res.status(200).json(cursos)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
