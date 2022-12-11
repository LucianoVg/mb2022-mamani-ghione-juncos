import NextCors from "nextjs-cors/dist";
import { Preanalitico } from "../../servicios/notas"

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            let idAlumno = req.query
            const preanalitico = await Preanalitico(idAlumno)
            preanalitico.forEach(p => {
                if (p.curso < 4) {
                    let dosDecimal = Number(p.notafinal).toFixed(2)
                    let nota = dosDecimal.toString().split('.')
                    let entero = Number(nota[0])
                    let decimal = Number(nota[1])
                    if (decimal) {
                        if (decimal <= 50) {
                            decimal = 50
                        }
                        if (decimal > 50) {
                            entero = entero + 1
                            decimal = 0
                        }
                        p.notafinal = Number(`${entero}.${decimal}`)
                    }
                }
            });

            return res.status(200).json(preanalitico)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}