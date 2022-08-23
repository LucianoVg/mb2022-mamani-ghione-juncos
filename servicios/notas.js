import { Prisma } from "./prisma";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient()

export async function TraerNotas(idTrimestre) {
    // export async function TraerNotas() {
    const notas = await prisma.nota.findMany({

        include: {
            materia: true,
            trimestre: true,
            alumnoXcursoXdivision: {
                include: {
                    usuario: true
                }
            }

        },
        where: {
            idTrimestre: idTrimestre
        }
    })
    return notas
}

export async function updateNota(idNota, nota) {

    const newNota = await prisma.nota.update({
        data: {
            nota: nota
                     
        },
        where: {
            id: idNota
        }
    })

    return newNota
}

// export async function agregarNoticia(titulo, creadaEn, url, descripcion, idUsuario) {

//     const agregar = await prisma.noticiasYnovedades.create({
//         data: {
//             titulo: titulo,
//             creadaEn: new Date(creadaEn),
//             url: url,
//             descripcion: descripcion,
//             idUsuario: idUsuario
//         }
//     })

//     return agregar
// }


