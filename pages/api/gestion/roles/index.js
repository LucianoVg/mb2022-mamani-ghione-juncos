import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(
    req,
    res
) {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: process.env.HOST,
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    try {
        const { rol } = req.query
        const roles = await traerRoles(rol)
        return res.status(200).json(roles)
    } catch (error) {
        return res.status(400).send(error)
    }
}

async function traerRoles(rol) {
    try {
        console.log(rol);
        let opt = {}
        let and = []
        // if (rol) and.push({ tipo: { not: rol } })
        // if (rol === "Director") and.push({ tipo: { not: "Administrador" } })
        opt = {
            ...opt,
            where: {
                AND: and
            }
        }
        return await db.rol.findMany(opt)
    } catch (error) {
        console.log(error);
    }
}