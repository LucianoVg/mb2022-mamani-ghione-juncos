import { db } from "../../../../../prisma";

export default async function handler(req, res) {
    try {
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