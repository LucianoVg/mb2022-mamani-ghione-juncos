import NextCors from "nextjs-cors/dist";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["PUT"],
      origin: process.env.HOST,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "PUT") {
      const { id } = req.query;
      const dataUsuario = req.body;
      const result = await actualizarUsuario(id, dataUsuario);
      return res.status(200).json({ mensaje: result });
    } else {
      return res.status(403).send("Metodo no permitido");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: error.message });
  }
}

async function actualizarUsuario(id, dataUsuario) {
  try {
    let data = {};
    if (dataUsuario.nombre) {
      data = { ...data, nombre: dataUsuario.nombre };
    }
    if (dataUsuario.apellido) {
      data = { ...data, apellido: dataUsuario.apellido };
    }
    if (dataUsuario.password) {
      data = { ...data, password: dataUsuario.password };
    }
    if (dataUsuario.legajo) {
      data = { ...data, legajo: dataUsuario.legajo };
    }
    if (dataUsuario.correo) {
      data = { ...data, correo: dataUsuario.correo };
    }
    if (dataUsuario.localidad) {
      data = { ...data, localidad: dataUsuario.localidad };
    }
    if (dataUsuario.direccion) {
      data = { ...data, direccion: dataUsuario.direccion };
    }
    if (dataUsuario.telefono) {
      data = { ...data, telefono: dataUsuario.telefono };
    }
    if (dataUsuario.fechanacimiento) {
      data = { ...data, fechanacimiento: dataUsuario.fechanacimiento };
    }
    if (dataUsuario.alumno.id) {
      data = {
        ...data,
        alumnoxcursoxdivision1: {
          update: {
            data: {
              cursoxdivision: {
                update: {
                  idcurso: Number(dataUsuario?.alumno?.idCurso),
                },
              },
            },
            where: {
              id: Number(dataUsuario?.alumno?.id),
            },
          },
        },
      };
    }
    if (dataUsuario.preceptor.id) {
      data = {
        ...data,
        preceptorxcurso: {
          connectOrCreate: dataUsuario.preceptor?.idCursos?.map((idcurso) => ({
            create: {
              idcurso: Number(idcurso),
            },
            where: {
              id: Number(dataUsuario?.preceptor?.id),
            },
          })),
        },
      };
    }
    if (dataUsuario.docente.id) {
      data = {
        ...data,
        docentexmateria: {
          update: {
            data: {
              materiaxcursoxdivision: dataUsuario?.docente?.idMaterias?.map(
                (idmateria) => ({
                  update: {
                    id: Number(idmateria),
                  },
                })
              ),
            },
            where: {
              id: Number(dataUsuario?.docente?.id),
            },
          },
        },
      };
    }
    console.log(data);
    const usuario = await db.usuario.update({
      data: data,
      where: {
        id: Number(id),
      },
    });
    console.log(usuario);
    return "Usuario actualizado";
  } catch (error) {
    console.log(error);
    return error.message;
  }
}
