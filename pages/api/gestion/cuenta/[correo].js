import { traerUsuario } from "../../../../servicios/cuenta";

export default async function handler(
    req,
    res
) {
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
