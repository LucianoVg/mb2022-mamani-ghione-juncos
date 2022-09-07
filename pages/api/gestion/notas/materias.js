import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors/dist";
import { TraerNotas } from "../../../../servicios/notas";
import { ListarMaterias } from "../../../../servicios/notas";
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
        const materias = await ListarMaterias()
        return res.status(200).json(materias)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
