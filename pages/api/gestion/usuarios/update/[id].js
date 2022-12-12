import { actualizarUsuario } from "../../../servicios/usuarios";

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { id } = req.query
            const { enfermedades, alergias } = req.body
            console.log(id, enfermedades, alergias);
            await actualizarUsuario(id, enfermedades, alergias)
            return res.status(200).json({ mensaje: 'Perfil actualizado' })
        } else {
            return res.status(401).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: error.message })
    }
}