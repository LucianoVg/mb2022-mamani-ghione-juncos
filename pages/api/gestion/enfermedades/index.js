import traerEnfermedades from "../../../../servicios/enfermedades";

export default async function handler(req, res) {
    try {
        const enfermedades = await traerEnfermedades()
        return res.status(200).json(enfermedades)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}