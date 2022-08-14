import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { iniciarSesion, registrarUsuario } from "../../../servicios/cuenta";
import { Prisma } from "../../../servicios/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'POST') {
            const { login, nombre, apellido, dni, telefono, correo, direccion, localidad } = req.body
            const creado = await registrarUsuario(login, nombre, apellido, correo, dni, telefono, localidad, direccion)

            return res.status(200).json(creado)
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
