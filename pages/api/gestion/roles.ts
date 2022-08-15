import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "../../../servicios/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'POST') {

        } else {
            const roles = await Prisma.newPrisma().rol.findMany()
            return res.status(200).json(roles)
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}