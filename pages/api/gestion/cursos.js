import { traerCursosXDivision } from "../../../servicios/cursos"

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const cursoXDivision = await traerCursosXDivision()

            return res.status(200).json(cursoXDivision)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {

    }
}