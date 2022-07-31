import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient()
    try {

        const asistencias = await prisma.asistencia.findMany({
     include: {
        tipoAsistencia: true,
        alumnoXcursoXdivision: {
            include: {
                cursoXdivision: {
                  include:{
                    curso: true,
                    division:true
                  }  
                },
                usuario: {
                    include: {
                        tutor: true
                    }
                }
            }
        },
        usuario: true

     }
        })
        console.log(asistencias);

        // asistencias.map(ass => {
        //     console.log(`Asistencia: ${ass.tipoAsistencia.tipo} 
        // - Valor: ${ass.tipoAsistencia.valor} 
        // - Fecha: ${ass.fecha} 
        // - Alumno: ${ass.usuario.nombre} ${ass.usuario.apellido}
        // - Preceptor: ${ass.usuario.nombre} ${ass.usuario.apellido}`)
        // })

        return res.status(200).json(asistencias)
    } catch (error) {
        return res.status(200).json(error)
    }
}