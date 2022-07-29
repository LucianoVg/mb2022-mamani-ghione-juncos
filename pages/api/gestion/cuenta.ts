import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const prisma = new PrismaClient()
        // REVISAR CONSULTA
        const asistenciaDeUsuarios = await prisma.asistencia.findMany({
            select: {
                tipoAsistencia: {
                    select: {
                        tipo: true,
                        valor: true
                    },
                },
                fecha: true,
                usuario: {
                    select: {
                        nombre: true,
                        apellido: true
                    }
                }
            }
        })
        asistenciaDeUsuarios.map(ass => {
            console.log(`Asistencia: ${ass.tipoAsistencia.tipo} 
        - Valor: ${ass.tipoAsistencia.valor} 
        - Fecha: ${ass.fecha} 
        - Alumno: ${ass.usuario.nombre} ${ass.usuario.apellido}
        - Preceptor: ${ass.usuario.nombre} ${ass.usuario.apellido}`)
        })

        return res.status(200).json(asistenciaDeUsuarios)
    } catch (error) {
        return res.status(200).json(error)
    }
}