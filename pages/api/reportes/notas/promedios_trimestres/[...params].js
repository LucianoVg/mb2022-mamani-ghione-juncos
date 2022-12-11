import NextCors from "nextjs-cors/dist";
import { PromedioXtrimestre } from "../../../servicios/notas"

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            let { params } = req.query
            console.log(params);
            const promedio = await PromedioXtrimestre(params[0], params[1])
            return res.status(200).json(promedio)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}