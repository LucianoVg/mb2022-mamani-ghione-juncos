import { NextApiRequest, NextApiResponse } from "next";
import { agregarNoticia, traerNoticia } from "../../../servicios/noticias_novedades";

export default async function handler(
    req,
    res
) {
    try {
        if (req.method === 'POST') {
            const { titulo, fecha, url, descripcion } = req.body
            const crear = await agregarNoticia(titulo, fecha, url, descripcion)
            return res.status(200).json(crear)

        }
        else {
            const Noticia = await traerNoticia()
            return res.status(200).json(Noticia)
        }

    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
