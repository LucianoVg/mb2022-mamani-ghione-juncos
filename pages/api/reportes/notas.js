import { contarNotas } from "../../../servicios/notas";

export default async function handler(req, res) {
    try {
        await contarNotas()
        return res.status(200).json({ countNotas: 0 })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)
    }
}