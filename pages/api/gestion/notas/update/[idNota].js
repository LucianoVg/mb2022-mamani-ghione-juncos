import NextCors from "nextjs-cors/dist";
import { updateNota } from "../../../servicios/notas"

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { idNota } = req.query
        const { nota1, nota2, nota3, nota4, nota5,
            columna1, columna2, columna3, columna4, columna5 } = req.body

        const notas = await updateNota(idNota, nota1, nota2, nota3, nota4, nota5,
            columna1, columna2, columna3, columna4, columna5)
        return res.status(200).json(notas)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
