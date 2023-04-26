import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            const { params } = req.query
            const usuario = await traerUsuario(params[0], params[1])
            return res.status(200).json(usuario)
        }
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}

export async function traerUsuario(correo, password) {
    try {
        const usuario = await db.usuario.findFirst({
            include: {
                rol: true,
                enfermedadesxusuario: {
                    include: {
                        enfermedad: true
                    }
                }
            },
            where: {
                AND: [
                    { correo: correo },
                    { password: password }
                ]
            }
        })
        return usuario
    } catch (error) {
        console.log(error);
    }
}