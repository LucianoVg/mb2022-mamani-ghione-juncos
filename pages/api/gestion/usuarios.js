import { NextApiRequest, NextApiResponse } from "next"
import { Prisma } from "../../../servicios/prisma"

export default async function handler(
    req,
    res
) {
    try {
        if (req.method === 'POST') {

        } else {
            const usuarios = await Prisma.newPrisma().usuario.findMany({
                include: {
                    rol: true
                }
            })
            return res.status(200).json(usuarios)
        }
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}