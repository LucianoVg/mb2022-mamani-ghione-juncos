import NextCors from "nextjs-cors/dist";
import { CrearNotificacion } from "../../servicios/notificaciones"

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['POST'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        if (req.method === 'POST') {
            const { asunto, contenido, fecha, idTutor, idUsuario, idCurso } = req.body
            console.log(asunto, contenido, fecha, idTutor, idUsuario, idCurso);
            const crear = await CrearNotificacion(asunto, contenido, fecha, idUsuario, idCurso, idTutor)
            console.log(crear);
            return res.status(200).json({ mensaje: crear })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
}