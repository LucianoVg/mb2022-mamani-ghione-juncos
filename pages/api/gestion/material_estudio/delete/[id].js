import { db } from "../../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['DELETE'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query
        const deleted = await db.materialestudio.delete({
            where: {
                id: Number(id)
            }
        })
        console.log(deleted);
        return res.status(200).send("Material eliminado")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}