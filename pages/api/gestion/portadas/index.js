import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(
    req,
    res
) {
    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === 'POST') {
        const { nombre, url, fichaInstitucionalId } = req.body
        const portadas = await guardarPortadas(nombre, url, fichaInstitucionalId)
        return res.status(200).json(portadas)
    }
}
async function guardarPortadas(nombre, url, fichaInstitucionalId) {
    const portada = await db.portadaficha.create({
        data: {
            nombre: nombre,
            url: url,
            idfichainstitucional: Number(fichaInstitucionalId)
        },
    })
    return portada
}