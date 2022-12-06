import { traerCursosXDivision } from "../../servicios/cursos";
export default async function handler(
    req,
    res
) {
    try {
        const cursos = await traerCursosXDivision()
        return res.status(200).json(cursos)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
