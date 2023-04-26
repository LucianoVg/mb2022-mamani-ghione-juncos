import NextCors from "nextjs-cors/dist";
import { db } from "../../../../../prisma";

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['PUT'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { idNota } = req.query
        const { nota1, nota2, nota3, nota4, nota5,
            columna1, columna2, columna3, columna4, columna5 } = req.body

        const notas = await updateNota(idNota, nota1, nota2, nota3, nota4, nota5,
            columna1, columna2, columna3, columna4, columna5)
        return res.status(200).json(notas)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}

export async function updateNota(idNota, nota1, nota2, nota3, nota4, nota5,
    columna1, columna2, columna3, columna4, columna5) {
    try {
        let notas = []
        if (columna1) {
            const newNota1 = await db.nota.update({
                data: {
                    nota1: Number(nota1)

                },
                where: {
                    id: Number(idNota)
                }
            })
            notas.push(newNota1)
        }
        if (columna2) {
            const newNota2 = await db.nota.update({
                data: {
                    nota2: Number(nota2)

                },
                where: {
                    id: Number(idNota)
                }
            })
            notas.push(newNota2)
        }
        if (columna3) {
            const newNota3 = await db.nota.update({
                data: {
                    nota3: Number(nota3)

                },
                where: {
                    id: Number(idNota)
                }
            })
            notas.push(newNota3)
        }
        if (columna4) {
            const newNota4 = await db.nota.update({
                data: {
                    nota4: Number(nota4)
                },
                where: {
                    id: Number(idNota)
                }
            })
            notas.push(newNota4)
        }
        if (columna5) {
            const newNota5 = await db.nota.update({
                data: {
                    nota5: Number(nota5)
                },
                where: {
                    id: Number(idNota)
                }
            })
            notas.push(newNota5)
        }
        return notas
    } catch (error) {
        console.log(error);
    }
}
