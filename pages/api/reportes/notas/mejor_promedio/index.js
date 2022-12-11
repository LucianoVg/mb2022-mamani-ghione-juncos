import { MejorPromedio } from "../../../servicios/notas";

export default async function handler(req, res) {
    try {
        const mejoresPromedios = await MejorPromedio()
        return res.status(200).json(mejoresPromedios)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}