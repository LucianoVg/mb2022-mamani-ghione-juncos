import { TraerAsistencias } from "../../../../servicios/asistencia";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const asistencias = await TraerAsistencias()
            return res.status(200).json(asistencias)
            // return new Response(JSON.stringify(asistencias),
            //     {
            //         status: 200,
            //         headers: {
            //             'content-type': 'application/json'
            //         }
            //     })
        } else {
            return res.status(401).json({ mensaje: 'Metodo no permitido' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

export const config = {
    api: {
        responseLimit: false
    }
}