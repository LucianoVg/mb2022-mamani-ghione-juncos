import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";
import { fechas } from "../../../../helpers/fechas";

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
  let usuarios = await db.usuario.findMany({
    select: {
      id: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  let data = {
    id: usuarios[0].id + 1,
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
  console.log("Data", data);
  let preceptorxcurso = [];
  try {
    if (esAlumno) {
      const usuario = await db.usuario.create({
        data: data,
      });
      const estadoalumno = await db.estadoalumno.findFirst({
        where: {
          estado: "Regular",
        },
      });
      const alumno = await db.alumnoxcursoxdivision.create({
        data: {
          idtutor: Number(idTutor),
          idcursoxdivision: Number(idCurso),
          idestadoalumno: Number(estadoalumno?.id),
          idusuario: Number(usuario.id),
          fechamatriculacion: new Date()
            .toLocaleDateString("en-GB")
            .split("T")[0],
        },
      });
      const materias = await db.materiaxcursoxdivision.findMany({
        include: {
          materia: true,
        },
        where: {
          idcursoxdivision: Number(idCurso),
        },
        orderBy: {
          materia: {
            id: "asc",
          },
        },
      });

      const trimestres = await db.trimestre.findMany({
        orderBy: {
          id: "asc",
        },
      });

      materias &&
        materias.map((m) => {
          trimestres &&
            trimestres.map(async (t) => {
              const nota = await db.nota.create({
                data: {
                  idalumnoxcursoxdivision: alumno?.id,
                  idmateria: m.idmateria,
                  idtrimestre: t.id,
                  nota1: 0,
                  nota2: 0,
                  nota3: 0,
                  nota4: 0,
                  nota5: 0,
                  anoactual: new Date().getFullYear(),
                  idusuario: Number(idUsuario),
                },
              });
              console.log(nota);
            });
        });

      fechas &&
        fechas.map(async (fecha) => {
          const asistencia = await db.asistencia.create({
            data: {
              idalumnoxcursoxdivision: alumno.id,
              presente: false,
              ausente: false,
              ausentejustificado: false,
              llegadatarde: false,
              mediafalta: false,
              creadoen: fecha,
              idusuario: Number(idUsuario),
              actualizadoen: "",
            },
          });
          console.log(asistencia);
        });

      return;
    }

    if (esDocente) {
      const usuario = await db.usuario.create({
        data: data,
      });
      idMaterias.map(async (idmateria) => {
        const docente = await db.docentexmateria.create({
          data: {
            idusuario: Number(usuario.id),
            idmateriaxcursoxdivision: Number(idmateria),
          },
        });
        console.log(docente);
      });
      fechas &&
        fechas.map(async (fecha) => {
          const asistencia = await db.asistenciadocente.create({
            data: {
              iddocente: Number(usuario.id),
              presente: false,
              ausente: false,
              ausentejustificado: false,
              llegadatarde: false,
              mediafalta: false,
              creadoen: fecha,
              idusuario: Number(idUsuario),
              actualizadoen: "",
            },
          });
          console.log(asistencia);
        });
      return;
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
