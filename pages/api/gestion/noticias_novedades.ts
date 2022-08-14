import { NextApiRequest, NextApiResponse } from "next";
import { agregarNoticia } from "../../../servicios/noticias_novedades";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'POST') {
            const { titulo, fecha, url, descripcion } = req.body
            const crear = await agregarNoticia(titulo, fecha, url, descripcion)
            return res.status(200).json(crear)
       
        } 
        // else {
        //     const { idRol } = req.query
        // }

    } catch (error: any) {
        return res.status(200).json({ mensaje: error.message })
    }
}
