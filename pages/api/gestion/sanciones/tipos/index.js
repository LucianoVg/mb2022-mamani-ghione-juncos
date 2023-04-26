import NextCors from "nextjs-cors/dist";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            const tipoSanciones = await traerTipoSanciones()
            return res.status(200).json(tipoSanciones)
        }
    } catch (error) {
        console.error(error);
    }
}

async function traerTipoSanciones() {
    try {
        const tipoSanciones = await db.tiposancion.findMany()
        return tipoSanciones
    } catch (error) {
        console.error(error);
    }
}