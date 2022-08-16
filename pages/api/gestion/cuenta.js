import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { iniciarSesion, registrarUsuario } from "../../../servicios/cuenta";
import { Prisma } from "../../../servicios/prisma";

export default async function handler(
    req,
    res
) {
    try {
        if (req.method === 'POST') {
            const { login,
                nombre, apellido, dni,
                telefono, correo, direccion,
                localidad, idRol, contrasenia } = req.body
            const creado = await registrarUsuario(login, nombre, apellido,
                correo, dni, telefono,
                localidad, direccion, Number.parseInt(idRol), contrasenia)

            return res.status(200).json(creado)
        } else {
            const { correo } = req.query
            const prisma = new PrismaClient()
            const usuario = await prisma.usuario.findFirst({
                where: {
                    correo: correo
                }
            })
            return res.status(200).json(usuario)
        }
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
