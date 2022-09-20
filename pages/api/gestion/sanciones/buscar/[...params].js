import NextCors from "nextjs-cors/dist";
import { traerSanciones } from "../../../../../servicios/sanciones"

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            const { params } = req.query
            const idCurso = params[0]
            const idAlumno = params[1]

            const sanciones = await traerSanciones(idCurso, idAlumno)
            return res.status(200).json(sanciones)
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send(error)
    }
}