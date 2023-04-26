import NextCors from "nextjs-cors";
import { db } from "../../../../../prisma";

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
        const { id } = req.query
        const detalles = await DetalleAsistencia(id)
        return res.status(200).json(detalles)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}

async function DetalleAsistencia(id) {
    try {
        const asistencia = await db.asistencia.findUnique({
            include: {
                usuario: true,
                alumnoxcursoxdivision: {
                    include: {
                        usuario: true,
                        cursoxdivision: {
                            include: {
                                curso: true,
                                division: true
                            }
                        }
                    }
                }
            },
            where: {
                id: Number(id)
            }

        })
        console.log(asistencia);
        return asistencia
    } catch (error) {
        console.log(error);
    }
}