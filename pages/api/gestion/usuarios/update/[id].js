import { actualizarUsuario } from "../../../servicios/usuarios";

export default async function handler(req, res) {
    try {
        if (req.method === 'PUT') {
            const { id } = req.query
            const dataUsuario = req.body
            const result = await actualizarUsuario(id, dataUsuario)
            return res.status(200).json({ mensaje: result })
        } else {
            return res.status(403).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: error.message })
    }
}