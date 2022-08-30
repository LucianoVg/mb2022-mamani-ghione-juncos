import traerAlumnos from "../../../../servicios/alumnos";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const alumnos = await traerAlumnos()
            return res.status(200).json(alumnos)
        }
    } catch (error) {
        console.error(error);
    }
}