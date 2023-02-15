import NextCors from "nextjs-cors/dist";
import traerTutores from "../../servicios/tutores";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            const tutores = await traerTutores()
            return res.status(200).json(tutores)
        }
    } catch (error) {
        console.error(error);
    }
}