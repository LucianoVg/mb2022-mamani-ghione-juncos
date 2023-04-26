import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            let { idAlumno } = req.query
            const sanciones = await ReporteSanciones(idAlumno)
            return res.status(200).json(sanciones)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

async function ReporteSanciones(idAlumno = 0) {
    try {
        let options = {
            include: {
                usuario: true,
                tiposancion: true
            },
            orderBy: {
                id: 'desc'
            }
        }
        if (idAlumno > 0) {
            options = {
                ...options,
                where: {
                    sancionxalumno: {
                        some: {
                            idalumnoxcursoxdivision: {
                                equals: Number(idAlumno)
                            }
                        }
                    }
                },
            }
        }
        const sanciones = await db.sancion.findMany(options)
        return sanciones
    } catch (error) {
        console.error(error);
    }
}