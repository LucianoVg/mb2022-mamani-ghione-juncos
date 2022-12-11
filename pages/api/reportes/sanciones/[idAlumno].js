import NextCors from "nextjs-cors/dist";
import { ReporteSanciones } from "../../servicios/sanciones"

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
            const sanciones = await ReporteSanciones(idAlumno)

            return res.status(200).json(sanciones)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}