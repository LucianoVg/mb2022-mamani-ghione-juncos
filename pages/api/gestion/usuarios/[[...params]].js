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
    if (req.method === "GET") {
      let { idUsuario, idRol, idLogged, rol, legajo, correo } = req.query;
      console.log(idUsuario, idRol, idLogged, rol);
      let and = [
        {
          activo: true,
        },
      ];
      let options = {
        include: {
          rol: true,
          docentexmateria: {
            include: {
              materiaxcursoxdivision: {
                include: {
                  materia: true,
                  cursoxdivision: {
                    include: {
                      curso: true,
                      division: true,
                    },
                  },
                },
              },
            },
          },
          preceptorxcurso: {
            include: {
              curso: true,
            },
          },
          alumnoxcursoxdivision1: {
            include: {
              tutor: true,
              cursoxdivision: {
                include: {
                  curso: true,
                  division: true,
                },
              },
            },
          },
          alumnoxcursoxdivision2: {
            include: {
              usuario: true,
              cursoxdivision: {
                include: {
                  curso: true,
                  division: true,
                },
              },
            },
          },
        },
        orderBy: {
          apellido: "asc",
        },
      };
      if (idUsuario) {
        and.push({
          id: Number(idUsuario),
        });
      }
      if (idRol) {
        and.push({
          rol: {
            id: Number(idRol),
          },
        });
      }
      if (idLogged) {
        and.push({
          id: {
            not: Number(idLogged),
          },
        });
      }
      if (rol === "Secretaria") {
        and.push({
          OR: [
            {
              rol: {
                tipo: "Estudiante"
              },
            },
            {
              rol: {
                tipo: "Tutor"
              },
            },
          ]
        },);
      }
      if (rol === "Director") {
        and.push({
          rol: {
            tipo: {
              not: "Administrador"
            }
          },
        },);
      }
      if (rol === "Vicedirector") {
        and.push({
          rol: {
            tipo: {
              not: "Administrador"
            },
          },
          rol: {
            tipo: {
              not: "Director"
            }
          },
        },);
      }
      if (legajo) {
        and.push({ legajo: legajo });
      }
      if (correo) {
        and.push({ correo: correo });
      }
      if (and.length) {
        options = {
          ...options,
          where: {
            AND: and,
          },
        };
      }
      const usuarios = await traerUsuarios(options);
      return res.status(200).json(usuarios);
    } else {
      return res.status(500).send("Metodo No Permitido");
    }
  } catch (error) {
    return res.status(200).json({ mensaje: error.message });
  }
}

async function traerUsuarios(options) {
  try {
    console.log(options);
    return await db.usuario.findMany(options);
  } catch (error) {
    console.log(error);
  }
}
