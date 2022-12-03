import { PrismaClient } from '@prisma/client';
import { asistencias, fechas } from './seeds/asistencias';

import { cursos } from './seeds/cursos';
import { ficha } from "./seeds/ficha";
// import { menus } from './seeds/menus';
import { notas } from './seeds/notas';
import { noticias } from './seeds/noticias';
import { tiposSancion } from './seeds/tiposSancion';
import { trimestres } from './seeds/trimestres';
import { enfermedades } from "./seeds/enfermedad";
import { usuarios } from "./seeds/usuarios";
// import { alumnos, fechas } from "./seeds/alumnos";
import { materias } from './seeds/materias';
import { menuXRoles } from './seeds/menuXRol';
import { portadaFicha } from './seeds/portadaFicha';
import { discapacidad } from './seeds/discapacidad';
import { roles } from './seeds/roles';
import { menus } from './seeds/menus';
import { docentes } from './seeds/docentes';
// import { roles } from './seeds/roles';

const prisma = new PrismaClient();

// const getAsistencias = async () => {
//     const asistencias = alumnos.map(a => (
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

    // const alumnos = await prisma.usuario.findMany({
    //     where: {
    //         idrol: 4
    //     },
    //     orderBy: {
    //         id: "asc"
    //     }
    // })


    // let i = 57

    // while (i < 62) {
    //     const alumnos = await prisma.alumnoxcursoxdivision.create({
    //         data: {
    //             idusuario: i,
    //             idcursoxdivision: 12,
    //             anoactual: 2022,
    //             idestadoalumno: 1

    //         }

    //     })
    //     console.log("usuario id:", i)

    //     i = i + 1

    // }





    const alumnos = await prisma.alumnoxcursoxdivision.findMany({
        include: {
            cursoxdivision: true
        }
    })



    fechas && fechas.map((fecha) => {
        alumnos && alumnos.map(async (a) => {
            const asistencia = await prisma.asistencia.create({
                data: {
                    idalumnoxcursoxdivision: a.id,
                    presente: false,
                    ausente: false,
                    ausentejustificado: false,
                    llegadatarde: false,
                    llegadatardejustificada: false,
                    mediafalta: false,
                    mediafaltajustificada: false,
                    motivo: "",
                    creadoen: fecha,
                    idusuario: 1,
                    actualizadoen: ""
                }

            })
            console.log(asistencia)
        })
    })



    // const nota = await prisma.nota.findMany({
    //     where: {
    //         idMateria: 70
    //     }

    // })
    // console.log(nota)


    // const trimestres = await prisma.trimestre.findMany({
    // })




    // alumnos && alumnos.map(async (a) => {

    //     // console.log(alumnos)
    //     switch (a.cursoxdivision.idcurso) {
    //         case 1:
    //             // console.log("entro al switch 1")
    //             const materias1 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 1
    //                 }

    //             })
    //             // console.log(materias1)

    //             materias1 && materias1.map(m => {
    //                 // console.log("entro a materias.map1")
    //                 trimestres && trimestres.map(async (t) => {
    //                     // console.log("entro a trimestres.map")
    //                     let nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: 0,
    //                             nota2: 0,
    //                             nota3: 0,
    //                             nota4: 0,
    //                             nota5: 0,
    //                             fecha: new Date().toLocaleDateString('es-AR').split('T')[0],
    //                             idusuario: 1
    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;
    //         case 2:
    //             const materias2 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 2
    //                 }

    //             })
    //             // console.log(materias)

    //             materias2 && materias.map(m => {
    //                 trimestres && trimestres.map(async (t) => {

    //                     let nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: 0,
    //                             nota2: 0,
    //                             nota3: 0,
    //                             nota4: 0,
    //                             nota5: 0,
    //                             fecha: new Date().toLocaleDateString('es-AR').split('T')[0],
    //                             idusuario: 1
    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;

    //         case 3:
    //             const materias3 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 3
    //                 }

    //             })
    //             // console.log(materias)

    //             materias3 && materias.map(m => {
    //                 trimestres && trimestres.map(async (t) => {

    //                     let nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: 0,
    //                             nota2: 0,
    //                             nota3: 0,
    //                             nota4: 0,
    //                             nota5: 0,
    //                             fecha: new Date().toLocaleDateString('es-AR').split('T')[0],
    //                             idusuario: 1
    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;

    //         case 4:
    //             const materias4 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 4
    //                 }

    //             })
    //             // console.log(materias)

    //             materias4 && materias.map(m => {
    //                 trimestres && trimestres.map(async (t) => {

    //                     let nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: 0,
    //                             nota2: 0,
    //                             nota3: 0,
    //                             nota4: 0,
    //                             nota5: 0,
    //                             fecha: new Date().toLocaleDateString('es-AR').split('T')[0],
    //                             idusuario: 1
    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;

    //         case 5:
    //             const materias5 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 5
    //                 }

    //             })
    //             // console.log(materias)

    //             materias5 && materias.map(m => {
    //                 trimestres && trimestres.map(async (t) => {

    //                     let nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: 0,
    //                             nota2: 0,
    //                             nota3: 0,
    //                             nota4: 0,
    //                             nota5: 0,
    //                             fecha: new Date().toLocaleDateString('es-AR').split('T')[0],
    //                             idusuario: 1
    //                         },
    //                     })
    //                     console.log(nota);

    //                 })

    //             })
    //             break;

    //         case 6:
    //             const materias6 = await prisma.materia.findMany({
    //                 where: {
    //                     idcurso: 6
    //                 }

    //             })
    //             // console.log(materias)

    //             materias6 && materias.map(m => {
    //                 trimestres && trimestres.map(async t => {

    //                     let nota = await prisma.nota.create({
    //                         data: {
    //                             idalumnoxcursoxdivision: a.id,
    //                             idmateria: m.id,
    //                             idtrimestre: t.id,
    //                             nota1: 0,
    //                             nota2: 0,
    //                             nota3: 0,
    //                             nota4: 0,
    //                             nota5: 0,
    //                             fecha: new Date().toLocaleDateString('es-AR').split('T')[0],
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


    // console.log(alumnos)

    // for (let i = 1; i < 7; i++) {
    //     const alumnos = await prisma.alumnoXcursoXdivision.findMany({
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
    //     const materias = await prisma.materia.findMany({
    //         where: {
    //             idCurso: i
    //         }

    //     })
    //     // console.log(materias)
    //     const trimestres = await prisma.trimestre.findMany({
    //     })

    //     // console.log(i)
    //     materias && materias.map(m => {
    //         // console.log("entro a materias.map")
    //         trimestres && trimestres.map(t => {
    //             // console.log("entro a trimestres.map")
    //             alumnos && alumnos.map(async (a) => {
    //                 // console.log("entro a alumnos.map")
    //                 let nota = await prisma.nota.create({
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

    // // LAS ASISTENCIAS NO DEBERIAN SER POR MATERIA? (ASISTENCIA_X_MATERIA)
    // usuarios.map(async (u) => {
    //     const asistencia = await prisma.asistencia.create({
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
    //     const asistencia = await prisma.asistencia.create({
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


    // const menus = await prisma.menu.findMany()
    // const roles = await prisma.rol.findMany()
    // console.log(menus, roles);

    // menus.map(async (m) => {
    //     const enfer = await prisma.menu.create({
    //         data: {
    //             menusistema: m.menuSistema,
    //             url: m.url
    //         }
    //     })
    //     console.log(enfer);
    // })


    // menuXRoles.map(async (m) => {
    //     const enfer = await prisma.menuxrol.create({
    //         data: {
    //            idmenu: m.idMenu,
    //            idrol: m.idRol
    //         }
    //     })
    //     console.log(enfer);
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
    //         ubicacion: ficha.ubicacion,
    //         telefono1: ficha.telefono1,
    //         telefono2: ficha.telefono2 ,
    //         tipoinstitucion: ficha.tipoInstitucion ,
    //         descripcion: ficha.descripcion ,
    //         oficina1: ficha.oficina1,
    //         oficina2: ficha.oficina2 ,
    //         mail: ficha.mail,
    //         idusuario: ficha.idUsuario
    //     }
    // })
    // console.log(fichaInstitucional);

    // portadaFicha.map(async (p) => {
    //     const portada = await prisma.portadaficha.createMany({
    //         data: {
    //             nombre: p.nombre,
    //             url: p.url,
    //             idfichainstitucional: 1
    //         }
    //     })
    //     console.log(portada);
    // })


    // cursos.map(async (c) => {

    //     const materi = await prisma.cursoxdivision.create({
    //         data: {

    //             idcurso: c.idCurso,
    //             iddivision: c.idDivision
    //         }
    //     })
    //     console.log(materi);
    // })


    // materias.map(async (m) => {

    //     const materi = await prisma.materia.create({
    //         data: {
    //             id: m.id,
    //             nombre: m.nombre,
    //             idcorrelativa: m.idCorrelativa,
    //             idcurso: m.idCurso
    //         }
    //     })
    //     console.log(materi);
    // })


    // roles.map(async (m) => {

    //     const roles = await prisma.rol.create({
    //         data: {
    //             id: m.id,
    //             tipo: m.tipo
    //         }
    //     })
    //     console.log(roles);

    // })

    // usuarios.map(async (u) => {
    //     const usuario = await prisma.usuario.create({
    //         data: {
    //             nombre: u.nombre,
    //             apellido: u.apellido,
    //             correo: u.correo,
    //             idrol: u.idRol,
    //             legajo: u.legajo,
    //             login: u.login,
    //             localidad: u.localidad,
    //             password: u.password,
    //             sexo: u.sexo,
    //             telefono: u.telefono,
    //             direccion: u.direccion
    //         }
    //     })
    //     console.log(usuario);
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





 // materias && materias.map(m => {
    //     trimestres && trimestres.map(t => {
    //         alumnos && alumnos.map(async (a) => {
    //             let nota = await prisma.nota.create({
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
    // const asistencias = await getAsistencias()
    // const creation = await prisma.asistencia.createMany({
    //     data: asistencias
    // })
    // console.log(creation);
