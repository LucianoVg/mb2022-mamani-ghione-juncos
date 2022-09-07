import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors/dist";
import { Prisma } from "../../../servicios/prisma";

export default async function handler(
    req,
    res
) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
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