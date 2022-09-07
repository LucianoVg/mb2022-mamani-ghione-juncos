import NextCors from "nextjs-cors/dist";
import { traerUsuario } from "../../../../servicios/cuenta";

export default async function handler(
    req,
    res
) {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    try {
        if (req.method === 'GET') {
            const { correo } = req.query
            console.log(correo);
            const usuario = await traerUsuario(correo)
            return res.status(200).json(usuario)
        }
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
