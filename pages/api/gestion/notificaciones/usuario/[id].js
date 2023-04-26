import NextCors from "nextjs-cors";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        if (req.method === 'GET') {
            const { id } = req.query
            const notificaciones = await ListarNotificacionesDeUsuario(id)
            return res.status(200).json(notificaciones)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

async function ListarNotificacionesDeUsuario(idUsuario) {
    try {
        const listado = await db.notificacionxalumno.findMany({
            include: {
                notificacion: {
                    include: {
                        usuario: {
                            include: {
                                rol: true
                            }
                        }
                    }
                }
            },
            where: {
                alumnoxcursoxdivision: {
                    id: Number(idUsuario)
                }
            },
            orderBy: {
                notificacion: {
                    fecha: 'desc'
                }
            }
        })

        return listado
    } catch (error) {
        console.log(error);
    }
}