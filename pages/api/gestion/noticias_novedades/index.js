import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['POST', 'GET'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        switch (req.method) {
            case 'POST':
                const { titulo, creadaEn, url, descripcion, idUsuario } = req.body
                const crear = await agregarNoticia(titulo, creadaEn, url, descripcion, idUsuario)
                return res.status(200).json(crear)
            case 'GET':
                const noticias = await traerNoticia()
                return res.status(200).json(noticias)
            default:
                return res.status(400).send('Metodo no permitido')
        }

    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}

async function agregarNoticia(titulo, creadaEn, url, descripcion, idUsuario) {
    const agregar = await db.noticiasynovedades.create({
        data: {
            titulo: titulo,
            creadaen: new Date(creadaEn),
            url: url,
            descripcion: descripcion,
            idusuario: Number(idUsuario)
        }
    })
    return agregar
}

async function traerNoticia(id = 0) {
    try {
        const noticias = id !== 0 ? await db.noticiasynovedades.findUnique({
            where: {
                id: Number(id)
            }
        }) : await db.noticiasynovedades.findMany({
            orderBy: {
                id: 'desc',
                
            }
        })
        return noticias
    } catch (error) {
        console.error(error);
    }
}