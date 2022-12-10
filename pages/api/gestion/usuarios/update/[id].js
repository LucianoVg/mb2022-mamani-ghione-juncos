import { actualizarUsuario } from "../../../servicios/usuarios";

export default async function handler(req, res) {
    const { id } = req.query
    const { enfermedades, alergias } = req.body
    try {
        console.log(id, enfermedades, alergias);
        await actualizarUsuario(id, enfermedades, alergias)
        return res.status(200).json({ mensaje: 'Perfil actualizado' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: error.message })
    }
}