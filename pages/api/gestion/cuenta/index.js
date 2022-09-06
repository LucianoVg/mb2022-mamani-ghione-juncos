import { registrarUsuario } from "../../../../servicios/cuenta";

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { login,
                nombre, apellido, dni,
                telefono, correo, direccion,
                localidad, idRol, idTutor, sexo, contrasenia, idCurso } = req.body

            const creado = await registrarUsuario(login, nombre, apellido,
                correo, dni, telefono,
                localidad, direccion, Number.parseInt(idRol), idTutor ? Number.parseInt(idTutor) : 0, contrasenia, sexo, idCurso ? Number.parseInt(idCurso) : 0)

            return res.status(200).json(creado)
        } else {
            return res.status(400).json({ mensaje: "Metodo no permitido" })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
}