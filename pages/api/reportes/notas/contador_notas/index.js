import { contarNotas } from "../../../../../servicios/notas";

export default async function handler(req, res) {
    try {

        const contar = await contarNotas()
        return res.status(200).json(contar)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)
    }
}