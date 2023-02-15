import traerTutor from "../../servicios/tutores";


export default async function handler(req, res) {
    try {
        const { idusuario } = req.query
        console.log(idusuario);
        const tutor = await traerTutor(idusuario)
        return res.status(200).json(tutor)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}