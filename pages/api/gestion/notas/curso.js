import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors/dist";
import { TraerNotas } from "../../../../servicios/notas";
import { ListarCurso } from "../../../../servicios/notas";
export default async function handler(
    req,
    res
) {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    try {
        const cursos = await ListarCurso()
        return res.status(200).json(cursos)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
