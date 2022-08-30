import { traerTipoSanciones } from "../../../../../servicios/sanciones";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const tipoSanciones = await traerTipoSanciones()
            return res.status(200).json(tipoSanciones)
        }
    } catch (error) {
        console.error(error);
    }
}