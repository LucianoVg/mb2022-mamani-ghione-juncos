import NextCors from "nextjs-cors/dist";
import { db } from "../../../../../prisma";

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'PUT', 'DELETE'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query
        switch (req.method) {
            case 'GET':
                const noticiaDetalle = await traerNoticia(Number(id))
                return res.json(noticiaDetalle)
            case 'PUT':
                const { titulo, url, descripcion, actualizadaEn } = req.body
                const noticiaActualizada = await editarNoticia(Number(id), titulo, url, descripcion, actualizadaEn)
                return res.status(200).json(noticiaActualizada)
            case 'DELETE':
                const noticia = await eliminarNoticia(Number(id))
                return res.status(200).json(noticia)
            default:
                return res.status(400).json({ mensaje: 'Metodo no permitido' })
        }

    } catch (error) {
        return res.status(400).json(error)
    }
}
async function traerNoticia(id = 0) {
    try {
        const noticias = id !== 0 ? await db.noticiasynovedades.findUnique({
            where: {
                id: Number(id)
            }
        }) : await db.noticiasynovedades.findMany({
            orderBy: {
                creadaen: 'desc'
            }
        })
        return noticias
    } catch (error) {
        console.error(error);
    }
}
async function editarNoticia(id, titulo, url, descripcion, actualizadaEn) {
    const editar = db.noticiasynovedades.update({
        data: {
            titulo: titulo,
            url: url,
            descripcion: descripcion,
            actualizadaen: new Date(actualizadaEn)
        },
        where: {
            id: Number(id)
        }
    })
    return editar
}

async function eliminarNoticia(id) {
    const eliminar = await db.noticiasynovedades.delete({
        where: {
            id: Number(id)
        }
    })
    return eliminar
}