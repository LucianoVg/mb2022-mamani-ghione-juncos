import NextCors from "nextjs-cors/dist";
import { ConteoAsistenciasMensual } from "../../../servicios/asistencia"

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            let { idAlumno } = req.query
            const conteo = await ConteoAsistenciasMensual(idAlumno)
            return res.status(200).json(conteo)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}