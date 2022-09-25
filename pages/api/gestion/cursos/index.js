import NextCors from "nextjs-cors/dist";
import { traerCursosXDivision } from "../../../../servicios/cursos"

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            const cursoXDivision = await traerCursosXDivision()

            return res.status(200).json(cursoXDivision)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {

    }
}