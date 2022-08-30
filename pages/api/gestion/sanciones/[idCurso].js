import { traerSanciones } from "../../../../servicios/sanciones"

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const param = req.query
            console.log(param.idCurso);
            const sanciones = await traerSanciones(Number.parseInt(param.idCurso))
            return res.status(200).json(sanciones)
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send(error)
    }
}