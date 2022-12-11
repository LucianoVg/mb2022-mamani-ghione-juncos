import NextCors from "nextjs-cors/dist";
import traerUsuarios from "../../servicios/usuarios";

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'POST'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            let { correo, legajo, nombre, apellido } = req.query
            console.log(correo, legajo, nombre, apellido);
            let OR = []
            let options = {
                include: {
                    rol: true
                },
            }
            if (correo) {
                OR.push({
                    correo: {
                        contains: correo
                    }
                })
            }
            if (legajo) {
                OR.push({
                    legajo: {
                        contains: legajo
                    }
                })
            }
            if (nombre) {
                OR.push({
                    nombre: {
                        contains: nombre[0].toUpperCase() + nombre.slice(1)
                    }
                })
            }
            if (apellido) {
                OR.push({
                    apellido: {
                        contains: apellido[0].toUpperCase() + apellido.slice(1)
                    }
                })
            }
            if (OR.length) {
                options = {
                    ...options,
                    where: {
                        OR: OR
                    }
                }
            }
            const usuarios = await traerUsuarios(options)
            return res.status(200).json(usuarios)
        } else {
            return res.status(500).send("Metodo No Permitido")
        }
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}