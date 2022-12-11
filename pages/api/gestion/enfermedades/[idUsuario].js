import traerEnfermedades from "../../servicios/enfermedades";

export default async function handler(req, res) {
    try {
        const {idUsuario} = req.query
        const enfermedades = await traerEnfermedades(Number(idUsuario))
        return res.status(200).json(enfermedades)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}