import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'PUT'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query
        if (req.method === 'PUT') {
            const { nombre, url, fichaInstitucionalId } = req.body
            const portada = await editarPortadas(id, nombre, url, fichaInstitucionalId)
            return res.status(200).json(portada)
        }
        if (req.method === 'GET') {
            const portadas = await traerPortadas(id)
            return res.status(200).json(portadas)
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json(error)
    }
}
async function editarPortadas(id, nombre, url, fichaInstitucionalId) {
    const portada = await db.portadaficha.update({
        where: {
            id: Number(id)
        },
        data: {
            nombre: nombre,
            url: url,
            idfichainstitucional: Number(fichaInstitucionalId)
        }
    })
    return portada
}
async function traerPortadas(idFicha) {
    const portadas = await db.portadaficha.findMany({
        where: {
            idfichainstitucional: Number(idFicha)
        },
        include: {
            fichainstitucional: true
        }
    })
    return portadas
}