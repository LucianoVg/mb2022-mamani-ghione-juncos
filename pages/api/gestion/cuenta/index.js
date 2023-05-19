import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["POST", "GET"],
      origin: process.env.HOST,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "POST") {
      const {
        login,
        nombre,
        apellido,
        legajo,
        telefono,
        correo,
        direccion,
        localidad,
        idRol,
        idTutor,
        sexo,
        contrasenia,
        idCurso,
        idUsuario,
        esAlumno,
        esDocente,
        esPreceptor,
        idMaterias,
        idCursos,
        fechaNacimiento,
      } = req.body;

      const creado = await registrarUsuario(
        login,
        nombre,
        apellido,
        correo,
        legajo,
        telefono,
        localidad,
        direccion,
        idRol,
        idTutor,
        contrasenia,
        sexo,
        idCurso,
        idUsuario,
        esAlumno,
        esDocente,
        esPreceptor,
        idMaterias,
        idCursos,
        fechaNacimiento
      );

      return res.status(200).json(creado);
    } else if (req.method === "GET") {
      const { correo, password } = req.query;
      const usuario = await traerUsuario(correo, password);
      console.log(usuario);
      if (!usuario) {
        return res.json({ error: "No se encontro al usuario" });
      }
      return res.status(200).json(usuario);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function registrarUsuario(
  login,
  nombre,
  apellido,
  correo,
  legajo,
  telefono,
  localidad,
  direccion,
  idRol,
  idTutor = 0,
  contrasenia,
  sexo,
  idCurso = 0,
  idUsuario,
  esAlumno = false,
  esDocente = false,
  esPreceptor = false,
  idMaterias = [],
  idCursos = [],
  fechaNacimiento
) {
  let ultimoId = await db.usuario.count();
  let data = {
    id: ++ultimoId,
    login,
    nombre,
    apellido,
    legajo,
    telefono,
    correo,
    direccion,
    localidad,
    activo: true,
    idrol: Number(idRol),
    sexo,
    password: contrasenia,
    fechanacimiento: fechaNacimiento,
  };
  let docentexmateria = [];
  let preceptorxcurso = [];
  try {
    if (esAlumno) {
      const estadoalumno = await db.estadoalumno.findFirst({
        where: {
          estado: "Regular",
        },
      });
      data = {
        ...data,
        alumnoxcursoxdivision1: {
          create: {
            idtutor: Number(idTutor),
            idcursoxdivision: Number(idCurso),
            idestadoalumno: Number(estadoalumno?.id),
            fechamatriculacion: new Date()
              .toLocaleDateString("en-GB")
              .split("T")[0],
            asistencia: {
              create: {
                presente: false,
                ausente: false,
                ausentejustificado: false,
                llegadatarde: false,
                mediafalta: false,
                creadoen: new Date().toLocaleDateString("en-GB").split("T")[0],
                idusuario: Number(idUsuario),
              },
            },
          },
        },
      };
    }

    if (esDocente) {
      idMaterias.map(async (idmateria) => {
        docentexmateria.push({
          idmateriaxcursoxdivision: Number(idmateria),
        });
      });
      data = {
        ...data,
        docentexmateria: {
          create: docentexmateria,
        },
        asistenciadocente1: {
          create: {
            presente: false,
            ausente: false,
            ausentejustificado: false,
            llegadatarde: false,
            mediafalta: false,
            creadoen: new Date().toLocaleDateString("en-GB").split("T")[0],
            idusuario: Number(idUsuario),
          },
        },
      };
    }

    if (esPreceptor) {
      idCursos.map((idCurso) => {
        preceptorxcurso.push({ idcurso: Number(idCurso) });
      });
      data = {
        ...data,
        preceptorxcurso: {
          create: preceptorxcurso,
        },
      };
    }

    return await db.usuario.create({
      data: data,
    });
  } catch (error) {
    throw error;
  }
}

export async function traerUsuario(correo, password) {
  let AND = [{ correo: correo }];
  if (password) {
    AND.push({ password });
  }
  try {
    const usuario = await db.usuario.findFirst({
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
      where: {
        AND: AND,
      },
    });
    console.log("Usuario:", usuario);
    return usuario;
  } catch (error) {
    console.log(error);
  }
}
