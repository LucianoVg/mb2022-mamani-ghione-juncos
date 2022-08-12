import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'POST') {
            const prisma = new PrismaClient()
            const { nombre, apellido, login, password } = req.body
            const usuario = await prisma.usuario.create({
                data: {
                    nombre: nombre,
                    apellido: apellido,
                    login: login,
                    password: password
                }
            })
            console.log(usuario);

            return res.status(200).json(usuario)
        } else {
            const prisma = new PrismaClient()
            const usuarios = await prisma.usuario.findMany({
                include: {
                    tutor: true
                },
                where: {
                    tutor: {
                        isNot: null
                    }
                }
            })
            return res.status(200).json(usuarios)
        }
    } catch (error: any) {
        return res.status(200).json({ mensaje: error.message })
    }
}
