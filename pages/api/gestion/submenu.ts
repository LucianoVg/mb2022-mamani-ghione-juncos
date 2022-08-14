import { NextApiRequest, NextApiResponse } from "next";
import { FiltrarMenu } from "../../../servicios/menu";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { idRol } = req.query
        const menuXrol = await FiltrarMenu(Number.parseInt(idRol as string))

        return res.status(200).json(menuXrol)
    } catch (error: any) {
        return res.status(200).json({ mensaje: error.message })
    }
}
