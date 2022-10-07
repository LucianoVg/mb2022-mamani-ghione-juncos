import NextCors from "nextjs-cors/dist";
import { registrarUsuario } from "../../../../servicios/cuenta";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['POST'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'POST') {
            const { login,
                nombre, apellido, legajo,
                telefono, correo, direccion,
                localidad, idRol, idTutor, sexo, contrasenia, idCurso } = req.body

            console.log({
                login,
                nombre, apellido, legajo,
                telefono, correo, direccion,
                localidad, idRol, idTutor, sexo, contrasenia, idCurso
            });
            const creado = await registrarUsuario(login, nombre, apellido,
                correo, legajo, telefono,
                localidad, direccion, idRol, idTutor ? idTutor : '', contrasenia, sexo, idCurso ? idCurso : '')

            return res.status(200).json(creado)
        } else {
            return res.status(400).json({ mensaje: "Metodo no permitido" })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
}