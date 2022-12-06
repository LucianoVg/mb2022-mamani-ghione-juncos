import NextCors from "nextjs-cors/dist";
import { traerUsuario } from "../../servicios/cuenta";

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            const { params } = req.query
            console.log(params);
            const usuario = await traerUsuario(params[0], params[1])
            return res.status(200).json(usuario)
        }
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
