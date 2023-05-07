import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'POST'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            let { idUsuario, idRol, idLogged, rol } = req.query
            console.log(idUsuario, idRol, idLogged, rol);
            let and = [
                {
                    activo: true
                },
            ]
            let options = {
                include: {
                    rol: true,
                    docentexmateria: true,
                    preceptorxcurso: true,
                    alumnoxcursoxdivision1: true
                },
                orderBy: {
                    apellido: 'asc'
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
            if (rol === "Secretaria") {
                and.push({
                    rol: {
                        tipo: "Estudiante"
                    }
                })
            }
            if (rol === "Director") {
                and.push({
                    rol: {
                        tipo: {
                            not: "Administrador"
                        }
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

async function traerUsuarios(options) {
    try {
        console.log(options);
        return await db.usuario.findMany(options)
    } catch (error) {
        console.log(error);
    }
}