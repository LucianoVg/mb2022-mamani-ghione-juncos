import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { login, password } = req.body
    const usuario = await iniciarSesion(login, password)

    if (usuario) {
        res.status(200).json(usuario)
    } else {
        res.status(200).json({ mensaje: "Usuario no encontrado" })
    }
}

const iniciarSesion = async (email: string, password: string) => {
    const prisma = new PrismaClient()
    const usuario = await prisma.cuenta.findFirst({
        where: {
            login: email,
            password: password
        }
    })

    return usuario
}