import { PrismaClient } from "@prisma/client";
import { fechas } from "./seeds/fechas";
import { division } from "./seeds/division";
import { cursos } from "./seeds/cursos";
import { cursosxdivision } from "./seeds/cursosxdivision";
import { ficha } from "./seeds/ficha";
// import { menus } from './seeds/menus';
import { notas } from "./seeds/notas";
import { noticias } from "./seeds/noticias";
import { tiposSancion } from "./seeds/tiposSancion";
import { trimestres } from "./seeds/trimestres";
import { enfermedades } from "./seeds/enfermedad";
import { usuarios } from "./seeds/usuarios";
import { materias } from "./seeds/materias";
import { menuXRoles } from "./seeds/menuXRol";
import { portadaFicha } from "./seeds/portadaFicha";
import { discapacidad } from "./seeds/discapacidad";
import { roles } from "./seeds/roles";
import { menus } from "./seeds/menus";
import { docentes } from "./seeds/docentes";
import { estadosAlumno } from "./seeds/estadosAlumno";
import { tutores } from "./seeds/tutores";
import { otrosUsuarios } from "./seeds/otrosUsuarios";
import { docentexmateria } from "./seeds/docentexmateria";
// import { preceptores } from './seeds/preceptores';
// import { preceptoresxcursos } from './seeds/preceptoresxcurso';
const prisma = new PrismaClient();

//  getAsistencias = async () => {
//      asistencias = alumnos.map(a => (
//         fechas.map(fecha => (
//             {
//                 idAlumnoXcursoXdivision: a.id,
//                 creadoEn: fecha,
//                 presente: false,
//                 llegadaTarde: false,
//                 ausente: false,
//                 ausenteJustificado: false,
//                 llegadaTardeJustificada: false,
//                 mediaFalta: false,
//                 mediaFaltaJustificada: false,
//                 idUsuario: '6345ee8566a769b309bd9367'
//             }
//         ))
//     ))
//     return asistencias.flat(1)
// }

async function main() {
  // menus.map(async (m) => {
  //     const menu = await prisma.menu.create({
  //         data: {
  //             menusistema: m.menuSistema,
  //             url: m.url
  //         }
  //     })
  //     console.log(menu);
  // })
  // menuXRoles.map(async (m) => {
  //     const menuXRoles = await prisma.menuxrol.create({
  //         data: {
  //             idmenu: m.idMenu,
  //             idrol: m.idRol
  //         }
  //     })
  //     console.log(menuXRoles);
  // })
  // estadosAlumno.map(async (e) => {
  //     const estado = await prisma.estadoalumno.create({
  //         data: {
  //             id: e.id,
  //             estado: e.estado
  //         }
  //     })
  //     console.log(estado);
  // })
  // enfermedades.map(async (m) => {
  //     const enfer = await prisma.enfermedad.create({
  //         data: {
  //             descripcion: m.nombre
  //         }
  //     })
  //     console.log(enfer);
  // })
  // discapacidad.map(async (m) => {
  //     const disc = await prisma.discapacidad.create({
  //         data: {
  //             nombre: m.nombre
  //         }
  //     })
  //     console.log(disc);
  // })
  // usuarios.map(async (u) => {
  //     // if (u.id === i) {
  //         const usuario = await prisma.usuario.create({
  //             data: {
  //                 id: Number(u.id),
  //                 nombre: u.nombre,
  //                 apellido: u.apellido,
  //                 correo: u.correo,
  //                 idrol: Number(u.idRol),
  //                 legajo: u.legajo,
  //                 login: u.login,
  //                 localidad: u.localidad,
  //             fechanacimiento: t.fechanacimiento,
  //                 password: u.password,
  //                 sexo: u.sexo,
  //                 telefono: u.telefono,
  //                 direccion: u.direccion
  //             }
  //         })
  //         console.log(usuario);
  //     // }
  // })
  // tutores.map(async (t) => {
  //     const usuario = await prisma.usuario.create({
  //         data: {
  //             id: t.id,
  //             nombre: t.nombre,
  //             apellido: t.apellido,
  //             correo: t.correo,
  //             idrol: t.idRol,
  //             legajo: t.legajo,
  //             login: t.login,
  //             localidad: t.localidad,
  //             fechanacimiento: t.fechanacimiento,
  //             password: t.password,
  //             sexo: t.sexo,
  //             telefono: t.telefono,
  //             direccion: t.direccion
  //         }
  //     })
  //     console.log(usuario);
  // })
  // otrosUsuarios.map(async (t) => {
  //     const usuario = await prisma.usuario.create({
  //         data: {
  //             id: t.id,
  //             nombre: t.nombre,
  //             apellido: t.apellido,
  //             correo: t.correo,
  //             idrol: t.idRol,
  //             legajo: t.legajo,
  //             login: t.login,
  //             localidad: t.localidad,
  //             fechanacimiento: t.fechanacimiento,
  //             password: t.password,
  //             sexo: t.sexo,
  //             telefono: t.telefono,
  //             direccion: t.direccion
  //         }
  //     })
  //     console.log(usuario);
  // })
  // docentes.map(async (t) => {
  //     const usuario = await prisma.usuario.create({
  //         data: {
  //             id: t.id,
  //             nombre: t.nombre,
  //             apellido: t.apellido,
  //             correo: t.correo,
  //             idrol: t.idrol,
  //             legajo: t.legajo,
  //             login: t.login,
  //             localidad: t.localidad,
  //             fechanacimiento: t.fechanacimiento,
  //             password: t.password,
  //             sexo: t.sexo,
  //             telefono: t.telefono,
  //             direccion: t.direccion
  //         }
  //     })
  //     console.log(usuario);
  // })
  // docentes.map(async (t) => {
  //     const usuario = await prisma.usuario.updateMany({
  //         where: {
  //             id: t.id
  //         },
  //         data: {
  //             legajo: t.legajo,
  //             sexo: t.sexo,
  //             telefono: t.telefono,
  //             direccion: t.direccion,
  //             fechanacimiento: t.fechanacimiento
  //         }
  //     })
  //     console.log(usuario);
  // })
  // otrosUsuarios.map(async (t) => {
  //     const usuario = await prisma.usuario.updateMany({
  //         where: {
  //             id: t.id
  //         },
  //         data: {
  //             legajo: t.legajo,
  //             sexo: t.sexo,
  //             telefono: t.telefono,
  //             direccion: t.direccion,
  //             fechanacimiento: t.fechanacimiento
  //         }
  //     })
  //     console.log(usuario);
  // })
  // preceptores.map(async (t) => {
  //     const usuario = await prisma.usuario.create({
  //         data: {
  //             id: t.id,
  //             nombre: t.nombre,
  //             apellido: t.apellido,
  //             correo: t.correo,
  //             idrol: t.idRol,
  //             legajo: t.legajo,
  //             login: t.login,
  //             localidad: t.localidad,
  //             fechanacimiento: t.fechanacimiento,
  //             password: t.password,
  //             sexo: t.sexo,
  //             telefono: t.telefono,
  //             direccion: t.direccion
  //         }
  //     })
  //     console.log(usuario);
  // })
  //  preceptores.map(async (t) => {
  //      const usuario = await prisma.usuario.updateMany({
  //          data: {
  //              fechanacimiento: t.fechanacimiento,
  //          },
  //          where: {
  //              id: t.id
  //          }
  //      })
  //      console.log(usuario);
  //  })
  // tutores.map(async (t) => {
  //     const usuario = await prisma.usuario.updateMany({
  //         where: {
  //             id: t.id
  //         },
  //         data: {
  //             localidad: t.localidad,
  //             correo: t.correo,
  //             legajo: t.legajo,
  //             sexo: t.sexo,
  //             telefono: t.telefono,
  //             direccion: t.direccion,
  //             fechanacimiento: t.fechanacimiento
  //         }
  //     })
  //     console.log(usuario);
  // })
  // usuarios.map(async (t) => {
  //     const usuario = await prisma.usuario.updateMany({
  //         where: {
  //             id: t.id
  //         },
  //         data: {
  //             correo: t.correo,
  //             legajo: t.legajo,
  //             sexo: t.sexo,
  //             telefono: t.telefono,
  //             direccion: t.direccion,
  //             fechanacimiento: t.fechanacimiento
  //         }
  //     })
  //     console.log(usuario);
  // })
  // materias.map(async (m) => {
  //     const materi = await prisma.materia.create({
  //         data: {
  //             id: m.id,
  //             nombre: m.nombre,
  //             idcorrelativa: m.idCorrelativa,
  //            
  //         }
  //     })
  //     console.log(materi);
  // })

  // materias.map(async (m) => {
  //   const materi = await prisma.materiaxcursoxdivision.create({
  //     data: {
  //       idmateria: m.id,
  //       idcursoxdivision: 12

  //     }
  //   })
  //   console.log(materi);
  // })

  // docentexmateria.map(async (n) => {
  //   const docentes = await prisma.docentexmateria.create({
  //     data: {
  //       idusuario: n.idusuario,
  //       idmateriaxcursoxdivision: n.idmateriaxcursoxdivision
  //     }
  //   })
  //   console.log(docentes);
  // })
  //    preceptoresxcursos.map(async (n) => {
  //         const docentes = await prisma.preceptorxcurso.create({
  //             data: {
  //                 idusuario: n.idUsuario,
  //                 idcurso: n.idCurso
  //             }
  //         })
  //         console.log(docentes);
  //     })
  // noticias.map(async (n) => {
  //     const noticia = await prisma.noticiasynovedades.create({
  //         data: {
  //             titulo: n.titulo,
  //             creadaen: n.creadaEn,
  //             actualizadaen: n.actualizadaEn,
  //             descripcion: n.descripcion,
  //             idusuario: n.idUsuario,
  //             url: n.url
  //         }
  //     })
  //     console.log(noticia);
  // })
  // const fichaInstitucional = await prisma.fichainstitucional.create({
  //     data: {
  //         nombreinstitucion: ficha.nombreInstitucion,
  //         ciudad: ficha.ciudad,
  //         provincia: ficha.provincia,
  //         telefono1: ficha.telefono1,
  //         telefono2: ficha.telefono2,
  //         tipoinstitucion: ficha.tipoInstitucion,
  //         descripcion: ficha.descripcion,
  //         oficina1: ficha.oficina1,
  //         oficina2: ficha.oficina2,
  //         mail: ficha.mail,
  //         idusuario: ficha.idUsuario
  //     }
  // })
  // console.log(fichaInstitucional);
  // portadaFicha.map(async (p) => {
  //     const portada = await prisma.portadaficha.create({
  //         data: {
  //             url: p.url,
  //             idfichainstitucional: 1
  //         }
  //     })
  //     console.log(portada);
  // })
  // cursos.map(async (c) => {
  //   const curso = await prisma.curso.create({
  //         data: {
  //             id: c.id,
  //             nombre: c.nombre
  //         }
  //     })
  //     console.log(curso);
  // })
  // division.map(async (d) => {
  //      const division = await prisma.division.create({
  //         data: {
  //             id: d.id,
  //             division: d.division
  //         }
  //     })
  //     console.log(division);
  // })
  // cursosxdivision.map(async (d) => {
  //     const cursosxdivision = await prisma.cursoxdivision.create({
  //         data: {
  //             id: d.id,
  //             idcurso: d.idCurso,
  //             iddivision: d.idDivision
  //         }
  //     })
  //     console.log(cursosxdivision);
  // })
  // trimestres.map(async (d) => {
  //     const trimestre = await prisma.trimestre.create({
  //         data: {
  //             id: d.id,
  //             trimestre: d.trimestre
  //         }
  //     })
  //     console.log(trimestre);
  // })
  // 2,6
  // 7,11
  // 12,16
  // 17,21
  // 22,26
  // 27,31
  // 32,36
  // 37,41
  // 42,46
  // 47,51
  // 52,56
  // 57,61
  // let i = 57
  // while (i <= 61) {
  //     const alumnos = await prisma.alumnoxcursoxdivision.create({
  //         data: {
  //             idusuario: i,
  //             idcursoxdivision: 12,
  //             fechamatriculacion: "20/03/2023",
  //             idestadoalumno: 1
  //         }
  //     })
  //     console.log("usuario id:", i)
  //     i = i + 1
  // }
  // const tutores = await prisma.usuario.findMany({
  //     orderBy: {
  //         id: "asc"
  //     },
  //     where: {
  //         idrol: 6
  //     }
  // })
  // let i = 2
  // let idTutor = 62
  // while (i < 62) {
  //     const tutor = await prisma.alumnoxcursoxdivision.updateMany({
  //         where: {
  //             idusuario: i
  //         },
  //         data: {
  //             idtutor: idTutor
  //         }
  //     })
  //     console.log("tutor id:", idTutor)
  //     i = i + 1
  //     idTutor = idTutor + 1
  // }
  // const alumnos = await prisma.alumnoxcursoxdivision.findMany({
  //     include: {
  //         cursoxdivision: true
  //     },
  // })
  // fechas && fechas.map((fecha) => {
  //     alumnos && alumnos.map(async (a) => {
  //         const asistencia = await prisma.asistencia.create({
  //             data: {
  //                 idalumnoxcursoxdivision: a.id,
  //                 presente: false,
  //                 ausente: false,
  //                 ausentejustificado: false,
  //                 llegadatarde: false,
  //                 mediafalta: false,
  //                 creadoen: fecha,
  //                 idusuario: 1,
  //                 actualizadoen: ""
  //             }
  //         })
  //         console.log(asistencia)
  //     })
  // })
  // const docentes = await prisma.usuario.findMany({
  //     where: {
  //         idrol: 1
  //     }
  // })
  // fechas && fechas.map((fecha) => {
  //     docentes && docentes.map(async (d) => {
  //         const asistencia = await prisma.asistenciadocente.create({
  //             data: {
  //                 iddocente: d.id,
  //                 presente: false,
  //                 ausente: false,
  //                 ausentejustificado: false,
  //                 llegadatarde: false,
  //                 mediafalta: false,
  //                 creadoen: fecha,
  //                 idusuario: 1,
  //                 actualizadoen: ""
  //             }
  //         })
  //         console.log(asistencia)
  //     })
  // })
  //  materias = await prisma.materia.findMany()
  // docentes.map(async (d) => {
  //     materias.map(async (m) => {
  //          docente = await prisma.usuario.create({
  //             data: {
  //                 login: d.login,
  //                 password: d.password,
  //                 nombre: d.nombre,
  //                 apellido: d.apellido,
  //                 fechanacimiento: d.fechanacimiento,
  //                 idrol: d.idrol,
  //                 direccion: d.direccion,
  //                 localidad: d.localidad,
  //                 legajo: d.legajo,
  //                 telefono: d.telefono,
  //                 sexo: d.sexo,
  //                 correo: d.correo,
  //                 docentexmateria: {
  //                     create: {
  //                         materia: {
  //                             connect: {
  //                                 id: m.id
  //                             }
  //                         },
  //                         asistenciadocente: {
  //                             create: {
  //                                 presente: false,
  //                                 ausente: false,
  //                                 ausentejustificado: false,
  //                                 llegadatarde: false,
  //                                 llegadatardejustificada: false,
  //                                 mediafalta: false,
  //                                 mediafaltajustificada: false,
  //                                 creadoen: '06/12/2022',
  //                                 motivo: '',
  //                                 idusuario: 1
  //                             }
  //                         }
  //                     }
  //                 }
  //             }
  //         })
  //         console.log(docente);
  //     })
  // })
  //  docentes = await prisma.docentexmateria.findMany()
  // docentes.map(async (d) => {
  //      asistencia = await prisma.asistenciadocente.create({
  //         data: {
  //             presente: false,
  //             ausente: false,
  //             ausentejustificado: false,
  //             llegadatarde: false,
  //             llegadatardejustificada: false,
  //             mediafalta: false,
  //             mediafaltajustificada: false,
  //             creadoen: '06/12/2022',
  //             motivo: '',
  //             docentexmateria: {
  //                 connect: {
  //                     id: d.id
  //                 }
  //             },
  //             usuario: {
  //                 connect: {
  //                     id: 1
  //                 }
  //             }
  //         }
  //     })
  //     console.log(asistencia);
  // })
  //  alumnos = await prisma.usuario.findMany({
  //     where: {
  //         idrol: 4
  //     },
  //     orderBy: {
  //         id: "asc"
  //     }
  // })
  //  nota = await prisma.nota.findMany({
  //     where: {
  //         idMateria: 70
  //     }
  // })
  //  random = Math.floor(Math.random() * (max - min + 1)) + min;
  // const trimestres = await prisma.trimestre.findMany({
  // })
  // const min = 6
  // const max = 10
  // const alumnos = await prisma.alumnoxcursoxdivision.findMany({
  //     where: {
  //         cursoxdivision: {
  //             curso: {
  //                 id: 1
  //             }
  //         }
  //     },
  //     include: {
  //         cursoxdivision: {
  //             include: {
  //                 curso: true
  //             }
  //         }
  //     },
  //     orderBy: {
  //         cursoxdivision: {
  //             idcurso: "asc"
  //         }
  //     }
  // })
  // // console.log(alumnos);
  // const materias1 = await prisma.materia.findMany({
  //     where: {
  //         idcurso: 1
  //     }
  // })
  // const materias2 = await prisma.materia.findMany({
  //     where: {
  //         idcurso: 2
  //     }
  // })
  // const materias3 = await prisma.materia.findMany({
  //     where: {
  //         idcurso: 3
  //     }
  // })
  // const materias4 = await prisma.materia.findMany({
  //     where: {
  //         idcurso: 4
  //     }
  // })
  // const materias5 = await prisma.materia.findMany({
  //     where: {
  //         idcurso: 5
  //     }
  // })
  // const materias6 = await prisma.materia.findMany({
  //     where: {
  //         idcurso: 6
  //     }
  // })
  // alumnos && alumnos.map(async (a) => {
  //     materias1 && materias1.map(m => {
  //         trimestres && trimestres.map(async (t) => {
  //             const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             // console.log("entro a trimestres.map")
  //             const nota = await prisma.nota.create({
  //                 data: {
  //                     idalumnoxcursoxdivision: a.id,
  //                     idmateria: m.id,
  //                     idtrimestre: t.id,
  //                     nota1: random,
  //                     nota2: random2,
  //                     nota3: random3,
  //                     nota4: random4,
  //                     nota5: random5,
  //                     anoactual: 2018,
  //                     idusuario: 1
  //                 },
  //             })
  //             console.log(nota);
  //         })
  //     })
  // })
  // alumnos && alumnos.map(async (a) => {
  //     materias2 && materias2.map(m => {
  //         trimestres && trimestres.map(async (t) => {
  //             const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const nota = await prisma.nota.create({
  //                 data: {
  //                     idalumnoxcursoxdivision: a.id,
  //                     idmateria: m.id,
  //                     idtrimestre: t.id,
  //                     nota1: random,
  //                     nota2: random2,
  //                     nota3: random3,
  //                     nota4: random4,
  //                     nota5: random5,
  //                     anoactual: 2019,
  //                     idusuario: 1
  //                 },
  //             })
  //             console.log(nota);
  //         })
  //     })
  // })
  // alumnos && alumnos.map(async (a) => {
  //     materias3 && materias3.map(m => {
  //         trimestres && trimestres.map(async (t) => {
  //             const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const nota = await prisma.nota.create({
  //                 data: {
  //                     idalumnoxcursoxdivision: a.id,
  //                     idmateria: m.id,
  //                     idtrimestre: t.id,
  //                     nota1: random,
  //                     nota2: random2,
  //                     nota3: random3,
  //                     nota4: random4,
  //                     nota5: random5,
  //                     anoactual: 2019,
  //                     idusuario: 1
  //                 },
  //             })
  //             console.log(nota);
  //         })
  //     })
  // })
  // alumnos && alumnos.map(async (a) => {
  //     materias4 && materias4.map(m => {
  //         trimestres && trimestres.map(async (t) => {
  //             const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const nota = await prisma.nota.create({
  //                 data: {
  //                     idalumnoxcursoxdivision: a.id,
  //                     idmateria: m.id,
  //                     idtrimestre: t.id,
  //                     nota1: random,
  //                     nota2: random2,
  //                     nota3: random3,
  //                     nota4: random4,
  //                     nota5: random5,
  //                     anoactual: 2021,
  //                     idusuario: 1
  //                 },
  //             })
  //             console.log(nota);
  //         })
  //     })
  // })
  // alumnos && alumnos.map(async (a) => {
  //     materias5 && materias5.map(m => {
  //         trimestres && trimestres.map(async (t) => {
  //             const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const nota = await prisma.nota.create({
  //                 data: {
  //                     idalumnoxcursoxdivision: a.id,
  //                     idmateria: m.id,
  //                     idtrimestre: t.id,
  //                     nota1: random,
  //                     nota2: random2,
  //                     nota3: random3,
  //                     nota4: random4,
  //                     nota5: random5,
  //                     anoactual: 2022,
  //                     idusuario: 1
  //                 },
  //             })
  //             console.log(nota);
  //         })
  //     })
  // })
  // alumnos && alumnos.map(async (a) => {
  //     materias6 && materias6.map(m => {
  //         trimestres && trimestres.map(async t => {
  //             const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             const nota = await prisma.nota.create({
  //                 data: {
  //                     idalumnoxcursoxdivision: a.id,
  //                     idmateria: m.id,
  //                     idtrimestre: t.id,
  //                     nota1: random,
  //                     nota2: random2,
  //                     nota3: random3,
  //                     nota4: random4,
  //                     nota5: random5,
  //                     anoactual: 2023,
  //                     idusuario: 1
  //                 },
  //             })
  //             console.log(nota);
  //         })
  //     })
  // })
  // alumnos && alumnos.map(async (a) => {
  //     switch (a.cursoxdivision?.idcurso) {
  //         case 1:
  //             materias1 && materias1.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     // console.log("entro a trimestres.map")
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2022,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             break;
  //         case 2:
  //             materias1 && materias1.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     // console.log("entro a trimestres.map")
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2021,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             materias2 && materias2.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2022,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             break;
  //         case 3:
  //             materias1 && materias1.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     // console.log("entro a trimestres.map")
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2020,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             materias2 && materias2.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2021,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             materias3 && materias3.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2022,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             break;
  //         case 4:
  //             materias1 && materias1.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     // console.log("entro a trimestres.map")
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2019,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             materias2 && materias2.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2020,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             materias3 && materias3.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2021,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             materias4 && materias4.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2022,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             break;
  //         case 5:
  //             materias1 && materias1.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     // console.log("entro a trimestres.map")
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2018,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             // console.log(materias)
  //             materias2 && materias2.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2019,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             // console.log(materias)
  //             materias3 && materias3.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2020,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             // console.log(materias)
  //             materias4 && materias4.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2021,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             // console.log(materias)
  //             materias5 && materias5.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2022,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             break;
  //         case 6:
  //             materias1 && materias1.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     // console.log("entro a trimestres.map")
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2017,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             // console.log(materias)
  //             materias2 && materias2.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2018,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             // console.log(materias)
  //             materias3 && materias3.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2019,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             // console.log(materias)
  //             materias4 && materias4.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2020,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             materias5 && materias5.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2021,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             materias6 && materias6.map(m => {
  //                 trimestres && trimestres.map(async t => {
  //                     const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     const nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2022,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             break;
  //         default:
  //             break;
  //     }
  // })
  // alumnos && alumnos.map(async (a) => {
  //     // console.log(alumnos)
  //     if (a.cursoxdivision?.idcurso === 1) {
  //         materias1 && materias1.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 // console.log("entro a trimestres.map")
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2022,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //     }
  //     if (a.cursoxdivision?.idcurso === 2) {
  //         materias1 && materias1.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 // console.log("entro a trimestres.map")
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2021,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         materias2 && materias2.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2022,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //     }
  //     if (a.cursoxdivision?.idcurso === 3) {
  //         materias1 && materias1.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 // console.log("entro a trimestres.map")
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2020,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         materias2 && materias2.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2021,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         materias3 && materias3.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2022,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //     }
  //     if (a.cursoxdivision?.idcurso === 4) {
  //         materias1 && materias1.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 // console.log("entro a trimestres.map")
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2019,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         materias2 && materias2.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2020,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         materias3 && materias3.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2021,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         materias4 && materias4.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2022,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //     }
  //     if (a.cursoxdivision?.idcurso === 5) {
  //         materias1 && materias1.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 // console.log("entro a trimestres.map")
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2018,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         // console.log(materias)
  //         materias2 && materias2.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2019,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         // console.log(materias)
  //         materias3 && materias3.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2020,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         // console.log(materias)
  //         materias4 && materias4.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2021,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         // console.log(materias)
  //         materias5 && materias5.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2022,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //     }
  //     if (a.cursoxdivision?.idcurso === 6) {
  //         materias1 && materias1.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 // console.log("entro a trimestres.map")
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2017,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         // console.log(materias)
  //         materias2 && materias2.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2018,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         // console.log(materias)
  //         materias3 && materias3.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2019,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         // console.log(materias)
  //         materias4 && materias4.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2020,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         materias5 && materias5.map(m => {
  //             trimestres && trimestres.map(async (t) => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2021,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //         materias6 && materias.map(m => {
  //             trimestres && trimestres.map(async t => {
  //                 const random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                 const nota = await prisma.nota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         anoactual: 2022,
  //                         idusuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //     }
  // })
  //  i = 1
  // alumnos && alumnos.map(async (a) => {
  //     // console.log(alumnos)
  //     switch (a.cursoxdivision?.idcurso) {
  //         case 1:
  //              materias1 = await prisma.materia.findMany({
  //                 where: {
  //                     idcurso: 1
  //                 }
  //             })
  //             materias1 && materias1.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                      random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                     // console.log("entro a trimestres.map")
  //                      nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2022,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             break;
  //         case 2:
  //              materias2 = await prisma.materia.findMany({
  //                 where: {
  //                     idcurso: 2
  //                 }
  //             })
  //             // console.log(materias)
  //             materias2 && materias2.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                      random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2022,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             break;
  //         case 3:
  //              materias3 = await prisma.materia.findMany({
  //                 where: {
  //                     idcurso: 3
  //                 }
  //             })
  //             // console.log(materias)
  //             materias3 && materias3.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                      random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2022,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             break;
  //         case 4:
  //              materias4 = await prisma.materia.findMany({
  //                 where: {
  //                     idcurso: 4
  //                 }
  //             })
  //             // console.log(materias)
  //             materias4 && materias4.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                      random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2022,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             break;
  //         case 5:
  //              materias5 = await prisma.materia.findMany({
  //                 where: {
  //                     idcurso: 5
  //                 }
  //             })
  //             // console.log(materias)
  //             materias5 && materias5.map(m => {
  //                 trimestres && trimestres.map(async (t) => {
  //                      random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2022,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             break;
  //         case 6:
  //              materias6 = await prisma.materia.findMany({
  //                 where: {
  //                     idcurso: 6
  //                 }
  //             })
  //             console.log(materias)
  //             materias6 && materias.map(m => {
  //                 trimestres && trimestres.map(async t => {
  //                      random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                      nota = await prisma.nota.create({
  //                         data: {
  //                             idalumnoxcursoxdivision: a.id,
  //                             idmateria: m.id,
  //                             idtrimestre: t.id,
  //                             nota1: random,
  //                             nota2: random2,
  //                             nota3: random3,
  //                             nota4: random4,
  //                             nota5: random5,
  //                             anoactual: 2022,
  //                             idusuario: 1
  //                         },
  //                     })
  //                     console.log(nota);
  //                 })
  //             })
  //             break;
  //         default:
  //             break;
  //     }
  // })
  //  trimestres = await prisma.trimestre.findMany({
  // })
  //  min = 6
  //  max = 10
  // //  random = Math.floor(Math.random() * (max - min + 1)) + min;
  //  alumnos = await prisma.alumnoxcursoxdivision.findMany({
  //     include: {
  //         cursoxdivision: true
  //     },
  //     // orderBy: {
  //     //     cursoxdivision: {
  //     //         idcurso: "asc"
  //     //     }
  //     // },
  //     where: {
  //         cursoxdivision: {
  //             idcurso: 6
  //         }
  //     }
  // })
  // alumnos && alumnos.map(async (a) => {
  //     // console.log(alumnos)
  //     if (a.cursoxdivision?.idcurso === 6) {
  //         // console.log("entro al switch 1")
  //          materias1 = await prisma.materia.findMany({
  //             where: {
  //                 idcurso: 1
  //             }
  //         })
  //         // console.log(materias1)
  //         materias1 && materias1.map(m => {
  //             // console.log("entro a materias.map1")
  //             trimestres && trimestres.map(async (t) => {
  //                 // console.log("entro a trimestres.map")
  //                  random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  nota = await prisma.historialnota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         ano: 2017
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //          materias2 = await prisma.materia.findMany({
  //             where: {
  //                 idcurso: 2
  //             }
  //         })
  //         // console.log(materias1)
  //         materias2 && materias2.map(m => {
  //             // console.log("entro a materias.map1")
  //             trimestres && trimestres.map(async (t) => {
  //                 // console.log("entro a trimestres.map")
  //                  random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  nota = await prisma.historialnota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         ano: 2018
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //          materias3 = await prisma.materia.findMany({
  //             where: {
  //                 idcurso: 3
  //             }
  //         })
  //         materias3 && materias3.map(m => {
  //             // console.log("entro a materias.map1")
  //             trimestres && trimestres.map(async (t) => {
  //                 // console.log("entro a trimestres.map")
  //                  random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  nota = await prisma.historialnota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         ano: 2019
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //          materias4 = await prisma.materia.findMany({
  //             where: {
  //                 idcurso: 4
  //             }
  //         })
  //         materias4 && materias4.map(m => {
  //             // console.log("entro a materias.map1")
  //             trimestres && trimestres.map(async (t) => {
  //                 // console.log("entro a trimestres.map")
  //                  random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  nota = await prisma.historialnota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         ano: 2020
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //          materias5 = await prisma.materia.findMany({
  //             where: {
  //                 idcurso: 5
  //             }
  //         })
  //         materias5 && materias5.map(m => {
  //             // console.log("entro a materias.map1")
  //             trimestres && trimestres.map(async (t) => {
  //                 // console.log("entro a trimestres.map")
  //                  random = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //                  nota = await prisma.historialnota.create({
  //                     data: {
  //                         idalumnoxcursoxdivision: a.id,
  //                         idmateria: m.id,
  //                         idtrimestre: t.id,
  //                         nota1: random,
  //                         nota2: random2,
  //                         nota3: random3,
  //                         nota4: random4,
  //                         nota5: random5,
  //                         ano: 2021
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //     }
  // })
  // console.log(alumnos)
  // for ( i = 1; i < 7; i++) {
  //      alumnos = await prisma.alumnoXcursoXdivision.findMany({
  //         include: {
  //             cursoXdivision: true
  //         },
  //         where: {
  //             cursoXdivision: {
  //                 idCurso: i
  //             }
  //         }
  //     })
  //     // console.log(alumnos)
  //      materias = await prisma.materia.findMany({
  //         where: {
  //             idCurso: i
  //         }
  //     })
  //     // console.log(materias)
  //      trimestres = await prisma.trimestre.findMany({
  //     })
  //     // console.log(i)
  //     materias && materias.map(m => {
  //         // console.log("entro a materias.map")
  //         trimestres && trimestres.map(t => {
  //             // console.log("entro a trimestres.map")
  //             alumnos && alumnos.map(async (a) => {
  //                 // console.log("entro a alumnos.map")
  //                  nota = await prisma.nota.create({
  //                     data: {
  //                         idAlumnoXcursoXdivision: a.id,
  //                         idMateria: m.id,
  //                         idTrimestre: t.id,
  //                         nota1: 0,
  //                         nota2: 0,
  //                         nota3: 0,
  //                         nota4: 0,
  //                         nota5: 0,
  //                         fecha: new Date().toLocaleDateString('es-AR').split('T')[0],
  //                         idUsuario: 1
  //                     },
  //                 })
  //                 console.log(nota);
  //             })
  //         })
  //     })
  // }
  //  menus = await prisma.menu.findMany()
  //  roles = await prisma.rol.findMany()
  // console.log(menus, roles);
  // cursosxdivision.map(async (c) => {
  //      materi = await prisma.cursoxdivision.create({
  //         data: {
  //             idcurso: c.idCurso,
  //             iddivision: c.idDivision
  //         }
  //     })
  //     console.log(materi);
  // })
  //  min = 6
  //  max = 10
  // //  random = Math.floor(Math.random() * (max - min + 1)) + min;
  //  trimestres = await prisma.trimestre.findMany({
  // })
  //  alumnos = await prisma.alumnoxcursoxdivision.findMany({
  //     where: {
  //         idcursoxdivision: 12
  //     }
  // })
  // console.log(alumnos)
  // alumnos && alumnos.map(async (a) => {
  //      materias1 = await prisma.materia.findMany({
  //         where: {
  //             idcurso: 6
  //         }
  //     })
  //     materias1 && materias1.map(m => {
  //         trimestres && trimestres.map(async (t) => {
  //              random = Math.floor(Math.random() * (max - min + 1)) + min;
  //              random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  //              random3 = Math.floor(Math.random() * (max - min + 1)) + min;
  //              random4 = Math.floor(Math.random() * (max - min + 1)) + min;
  //              random5 = Math.floor(Math.random() * (max - min + 1)) + min;
  //             // console.log("entro a trimestres.map")
  //              nota = await prisma.nota.create({
  //                 data: {
  //                     idalumnoxcursoxdivision: a.id,
  //                     idmateria: m.id,
  //                     idtrimestre: t.id,
  //                     nota1: random,
  //                     nota2: random2,
  //                     nota3: random3,
  //                     nota4: random4,
  //                     nota5: random5,
  //                     anoactual: 2021,
  //                     idusuario: 1
  //                 },
  //             })
  //             console.log(nota);
  //         })
  //     })
  // })
  // materias && materias.map(m => {
  //     trimestres && trimestres.map(t => {
  //         alumnos && alumnos.map(async (a) => {
  //             nota = await prisma.nota.create({
  //                 data: {
  //                     idAlumnoXcursoXdivision: a.id,
  //                     idMateria: m.id,
  //                     idTrimestre: t.id,
  //                     nota1: 0,
  //                     nota2: 0,
  //                     nota3: 0,
  //                     nota4: 0,
  //                     nota5: 0
  //                 }
  //             })
  //             console.log(nota);
  //         })
  //     })
  // })
  // roles.map(async (r) => {
  //     const rol = await prisma.rol.create({
  //         data: {
  //             id: r.id,
  //             tipo: r.tipo
  //         }
  //     })
  //     console.log(rol);
  // })
  // tutores.map(async (t) => {
  //      tutor = await prisma.alumnoxcursoxdivision.updateMany({
  //         // include: {
  //         //     usuario: {
  //         //         select: {
  //         //             apellido: true
  //         //         }
  //         //     }
  //         // },
  //         where: {
  //             usuario: {
  //                 apellido: t.apellido
  //             }
  //         },
  //         data: {
  //             idtutor: t.id
  //         }
  //     })
  //     console.log(tutor);
  // })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// asistencias = await getAsistencias()
// creation = await prisma.asistencia.createMany({
//     data: asistencias
// })
// console.log(creation);

// // LAS ASISTENCIAS NO DEBERIAN SER POR MATERIA? (ASISTENCIA_X_MATERIA)
// usuarios.map(async (u) => {
//      asistencia = await prisma.asistencia.create({
//         data: {
//             presente: false,
//             ausente: false,
//             ausenteJustificado: false,
//             llegadaTarde: false,
//             llegadaTardeJustificada: false,
//             mediaFalta: false,
//             mediaFaltaJustificada: false,
//             creadoEn: new Date().toISOString().split('T')[0],
//             motivo: '',
//             usuario: {
//                 connect: {
//                     id: 57
//                 }
//             },
//             alumnoXcursoXdivision: {
//                 create: {
//                     anoActual: 2022,
//                     idCursoXdivision: 1,
//                     idEstadoAlumno: 1,
//                     idUsuario: u.id,
//                 }
//             }
//         }
//     })
//     console.log(asistencia);
// })

// LAS ASISTENCIAS NO DEBERIAN SER POR MATERIA? (ASISTENCIA_X_MATERIA)
// usuarios.map(async (u) => {
//      asistencia = await prisma.asistencia.create({
//         data: {
//             presente: false,
//             ausente: false,
//             ausenteJustificado: false,
//             llegadaTarde: false,
//             llegadaTardeJustificada: false,
//             mediaFalta: false,
//             mediaFaltaJustificada: false,
//             creadoEn: new Date().toISOString().split('T')[0],
//             motivo: '',
//             usuario: {
//                 connect: {
//                     id: 57
//                 }
//             },
//             alumnoXcursoXdivision: {
//                 create: {
//                     anoActual: 2022,
//                     idCursoXdivision: 1,
//                     idEstadoAlumno: 1,
//                     idUsuario: u.id,
//                 }
//             }
//         }
//     })
//     console.log(asistencia);
// })
