import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET"],
      origin: process.env.HOST,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    let { idMateria, idTrimestre, idDivision, idAlumno, idCurso, idCursoXdivision } = req.query;
    console.log({ idMateria, idTrimestre, idDivision, idAlumno, idCurso });
    let options = {
      include: {
        materia: true,
        trimestre: true,
        alumnoxcursoxdivision: {
          include: {
            usuario: true,
            cursoxdivision: true,
          },
        },
      },
      orderBy: [
        {
          alumnoxcursoxdivision: {
            usuario: {
              apellido: "asc",
            },
          },
        },
        {
          idmateria: "asc",
        },
      ],
    };
    let AND = [
      {
        idtrimestre: Number(idTrimestre),
      },
      {
        alumnoxcursoxdivision: {
          usuario: {
            activo: true,
          },
        },
      },
    ];

    if (idMateria) {
      AND.push({ idmateria: Number(idMateria) });
    }
    if (idDivision) {
      AND.push({
        alumnoxcursoxdivision: {
          cursoxdivision: {
            division: {
              id: Number(idDivision),
            },
          },
        },
      });
    }



    
    if (idCursoXdivision) {
      AND.push({
        alumnoxcursoxdivision: {
         idcursoxdivision: idCursoXdivision
        },
      });
    }




    if (idAlumno) {
      AND.push({
        alumnoxcursoxdivision: {
          id: Number(idAlumno),
        },
      });
    }
    if (idCurso) {
      AND.push({
        materia: {
          curso: {
            id: Number(idCurso),
          },
        },
      });
    }
    options = {
      ...options,
      where: { AND: AND },
    };
    const notas = await TraerNotas(options);
    return res.status(200).json(notas);
  } catch (error) {
    return res.status(200).json({ mensaje: error.message });
  }
}
export async function TraerNotas(options) {
  try {
    const notas = await db.nota.findMany(options);
    // console.log(notas);
    return notas;
  } catch (error) {
    console.error(error);
  }
}

export const config = {
  api: {
    responseLimit: "8mb",
  },
};
