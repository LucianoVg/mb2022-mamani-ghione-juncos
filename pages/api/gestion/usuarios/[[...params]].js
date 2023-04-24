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
            let { idUsuario, idRol, idLogged } = req.query
            console.log(idUsuario, idRol, idLogged);
            let and = []
            let options = {
                include: {
                    rol: true
                },
            }
            if (idUsuario) {
                and.push({
                    id: Number(idUsuario)
                })
            }
            if (idRol) {
                and.push({
                    rol: {
                        id: Number(idRol)
                    }
                })
            }
            if (idLogged) {
                and.push({
                    id: {
                        not: Number(idLogged)
                    }
                })
            }
            if (and.length) {
                options = {
                    ...options,
                    where: {
                        AND: and
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