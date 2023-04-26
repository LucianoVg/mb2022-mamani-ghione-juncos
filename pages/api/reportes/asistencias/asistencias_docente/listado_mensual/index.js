import NextCors from "nextjs-cors/dist";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            let { idDocente, mes } = req.query
            console.log(idDocente, mes);
            const conteo = await ListadoAsistenciasMensual(idDocente, mes)
            return res.status(200).json(conteo)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

export async function ListadoAsistenciasMensual(idDocente, mes) {
    let dia = Number(mes) === 3 || Number(mes) === 5 || Number(mes) === 8 || Number(mes) === 10 || Number(mes) === 12 ? 31 : 30

    let fechaInicio = `01/${mes < 10 ? '0' + mes : mes}/${new Date().getFullYear()}`
    let fechaFin = `${dia}/${mes < 10 ? '0' + mes : mes}/${new Date().getFullYear()}`
    try {
        return await db.$queryRaw`SELECT 
        *
    FROM asistenciadocente a
    inner join alumnoxcursoxdivision al on al.id = a.iddocentexmateria
    inner join usuario u on u.id = al.idusuario
    where (TO_DATE(creadoen,'DD/MM/YYYY') between  TO_DATE(${fechaInicio},'DD/MM/YYYY') and TO_DATE(${fechaFin},'DD/MM/YYYY') ) and iddocentexmateria = ${Number(idDocente)}
      order by creadoen asc`
    } catch (error) {
        console.error(error);
    }
}