import { NextApiRequest, NextApiResponse } from "next";
import { FiltrarMenu } from "../../../servicios/filtrar_menu";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { menu, idRol } = req.body
        const menuXrol = await FiltrarMenu(menu, idRol)
        console.log(menuXrol);

        return res.status(200).json(menuXrol)

    } catch (error: any) {
        return res.status(200).json({ mensaje: error.message })
    }
}
