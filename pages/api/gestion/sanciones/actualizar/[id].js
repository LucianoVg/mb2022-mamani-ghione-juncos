import NextCors from "nextjs-cors/dist";
import { actualizarSancion, obtenerSancion } from "../../../../../servicios/sanciones"

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['PUT'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query

        const {
            idSancionXAlumno,
            idUsuario,
            idCurso,
            idAlumno,
            idTipoSancion,
            motivo
        } = req.body

        const sancion = await actualizarSancion(
            id,
            idSancionXAlumno,
            idUsuario,
            idCurso,
            idAlumno,
            idTipoSancion,
            motivo)

        return res.status(200).json(sancion)
    } catch (error) {
        return res.status(400).send(error)
    }
}