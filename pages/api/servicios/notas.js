import { Prisma } from "./prisma";

export async function MejorPromedio() {
    try {
        return await Prisma.newPrisma.$queryRaw`select  concat (u.nombre, ' ' , u.apellido) as alumno, idalumnoxcursoxdivision,
        avg ((SELECT AVG(c)
               FROM   (VALUES(nota1),
                             (nota2),
                             (nota3),
                             (nota4),
                             (nota5)) T (c))) as promediototal
       from nota as hn
       INNER JOIN materia as m ON m.id = hn.idmateria
       INNER JOIN alumnoxcursoxdivision as a ON a.id = hn.idalumnoxcursoxdivision
       INNER JOIN usuario as u ON u.id = a.idusuario
       where a.idcursoxdivision = 8  or a.idcursoxdivision = 9
       group by alumno,idalumnoxcursoxdivision
       order by promediototal desc`
    } catch (error) {
        console.error(error);
    }
}

export async function Preanalitico(idAlumno) {
    try {
        return await Prisma.newPrisma.$queryRaw`select m.id as id ,m.nombre as materia, m.idcurso as curso , idalumnoxcursoxdivision,
        avg ((SELECT AVG(c)
               FROM   (VALUES(nota1),
                             (nota2),
                             (nota3),
                             (nota4),
                             (nota5)) T (c))) as notafinal
       from nota as hn
       INNER JOIN materia as m ON m.id = hn.idmateria
       where idalumnoxcursoxdivision = ${Number(idAlumno)}
       group by  m.nombre, idalumnoxcursoxdivision, m.idcurso, m.id
       order by m.idcurso asc, m.id asc`
    } catch (error) {
        console.error(error);
    }
}

export async function PromedioXtrimestre(idAlumno, idMateria) {
    try {
        return await Prisma.newPrisma.$queryRaw`select m.nombre as materia, idalumnoxcursoxdivision,t.trimestre as trimestre,
        (SELECT AVG(c)
               FROM   (VALUES(nota1),
                             (nota2),
                             (nota3),
                             (nota4),
                             (nota5)) T (c)) AS Promedio
       from nota as hn
       INNER JOIN materia as m ON m.id = hn.idmateria
       INNER JOIN trimestre as t ON t.id = hn.idtrimestre
       where idalumnoxcursoxdivision =${Number(idAlumno)} and idmateria = ${Number(idMateria)}
       order by m.nombre asc, t.trimestre asc`
    } catch (error) {
        console.error(error);
    }
}

export async function notasTrimestres(idAlumno, idMateria) {
    try {
        return await Prisma.newPrisma.$queryRaw`select m.nombre as materia ,idtrimestre as id,nota1,nota2,nota3,nota4,nota5 from historialnota hn
         INNER JOIN materia as m ON m.id = hn.idmateria
        where idmateria = ${Number(idMateria)} and idalumnoxcursoxdivision = ${Number(idAlumno)}
        group by idtrimestre,nota1,nota2,nota3,nota4,nota5, m.nombre`

    } catch (error) {
        console.log(error);
    }
}


export async function contarNotas(idMateria) {
    try {
        const conteo = await Prisma.newPrisma.$queryRaw`SELECT n.idmateria,
        (
             (select count(*) from nota where   nota1= 1   and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota2= 1    and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where   nota3= 1  and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota4= 1   and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where    nota5= 1  and idmateria =${Number(idMateria)}) 
        ) as nota1,
        (
             (select count(*) from nota where   nota1= 2  and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota2= 2  and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where   nota3= 2  and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota4= 2   and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where    nota5= 2  and idmateria =${Number(idMateria)}) 
        ) as nota2,
        (
             (select count(*) from nota where   nota1= 3   and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota2= 3  and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where   nota3= 3  and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota4=3   and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where    nota5= 3  and idmateria =${Number(idMateria)}) 
        ) as nota3,
        (
             (select count(*) from nota where   nota1= 4   and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota2= 4  and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where   nota3= 4  and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota4= 4   and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where    nota5= 4 and idmateria =${Number(idMateria)}) 
        ) as nota4,
        (
             (select count(*) from nota where   nota1= 5   and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota2= 5  and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where   nota3= 5  and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where   nota4= 5  and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where    nota5= 5  and idmateria =${Number(idMateria)}) 
        ) as nota5,
        (
             (select count(*) from nota where   nota1= 6   and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota2= 6 and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where   nota3= 6  and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota4= 6   and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where    nota5= 6  and idmateria =${Number(idMateria)}) 
        ) as nota6,
        (
             (select count(*) from nota where   nota1= 7   and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota2= 7  and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where   nota3= 7  and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota4= 7   and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where    nota5= 7 and idmateria =${Number(idMateria)}) 
        ) as nota7,
        (
             (select count(*) from nota where   nota1= 8   and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota2= 8  and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where   nota3= 8  and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota4= 8   and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where    nota5= 8  and idmateria =${Number(idMateria)}) 
        ) as nota8,
        (
             (select count(*) from nota where   nota1= 9   and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota2= 9  and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where   nota3= 9  and idmateria =${Number(idMateria)})  +
             (select count(*) from nota where   nota4= 9   and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where    nota5= 9  and idmateria =${Number(idMateria)}) 
        ) as nota9,
        (
             (select count(*) from nota where   nota1= 10   and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota2= 10 and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where   nota3= 10  and idmateria =${Number(idMateria)})+
             (select count(*) from nota where   nota4= 10  and idmateria =${Number(idMateria)}) +
             (select count(*) from nota where   nota5= 10  and idmateria =${Number(idMateria)}) 
        ) as nota10
        FROM historialnota as n
        where idmateria= ${Number(idMateria)}
        group by n.idmateria`

        var string = JSON.stringify(conteo, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        let notas = JSON.parse(string)
        return notas

    } catch (error) {
        console.log(error);
    }
}


export async function TraerNotas(options) {
    try {
        const notas = await Prisma.newPrisma.nota.findMany(options)
        // console.log(notas);
        return notas
    } catch (error) {
        console.error(error);
    }
}


export async function updateNota(idNota, nota1, nota2, nota3, nota4, nota5,
    columna1, columna2, columna3, columna4, columna5) {
    try {
        let notas = []
        if (columna1) {
            const newNota1 = await Prisma.newPrisma.nota.update({
                data: {
                    nota1: Number(nota1)

                },
                where: {
                    id: Number(idNota)
                }
            })
            notas.push(newNota1)
        }
        if (columna2) {
            const newNota2 = await Prisma.newPrisma.nota.update({
                data: {
                    nota2: Number(nota2)

                },
                where: {
                    id: Number(idNota)
                }
            })
            notas.push(newNota2)
        }
        if (columna3) {
            const newNota3 = await Prisma.newPrisma.nota.update({
                data: {
                    nota3: Number(nota3)

                },
                where: {
                    id: Number(idNota)
                }
            })
            notas.push(newNota3)
        }
        if (columna4) {
            const newNota4 = await Prisma.newPrisma.nota.update({
                data: {
                    nota4: Number(nota4)
                },
                where: {
                    id: Number(idNota)
                }
            })
            notas.push(newNota4)
        }
        if (columna5) {
            const newNota5 = await Prisma.newPrisma.nota.update({
                data: {
                    nota5: Number(nota5)
                },
                where: {
                    id: Number(idNota)
                }
            })
            notas.push(newNota5)
        }
        return notas
    } catch (error) {
        console.log(error);
    }
}


// export async function contarNotas() {
//     try {
//         const nota1_1 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota1: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota1: 1
//                     }


//                 ]
//             }
//         })

//         const nota1_2 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota2: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },


//                     {
//                         nota2: 1
//                     }


//                 ]
//             }
//         })
//         const nota1_3 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota3: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota3: 1
//                     },

//                 ]
//             }
//         })
//         const nota1_4 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota4: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota4: 1
//                     },

//                 ]
//             }
//         })
//         const nota1_5 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota5: true

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota5: 1
//                     }

//                 ]
//             }
//         })
//         const nota2_1 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota1: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota1: 2
//                     }


//                 ]
//             }
//         })

//         const nota2_2 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota2: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },


//                     {
//                         nota2: 2
//                     }


//                 ]
//             }
//         })
//         const nota2_3 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota3: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota3: 2
//                     },

//                 ]
//             }
//         })
//         const nota2_4 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota4: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota4: 2
//                     },

//                 ]
//             }
//         })
//         const nota2_5 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota5: true

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota5: 2
//                     }

//                 ]
//             }
//         })
//         const nota3_1 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota1: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota1: 3
//                     }


//                 ]
//             }
//         })

//         const nota3_2 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota2: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },


//                     {
//                         nota2: 3
//                     }


//                 ]
//             }
//         })
//         const nota3_3 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota3: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota3: 3
//                     },

//                 ]
//             }
//         })
//         const nota3_4 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota4: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota4: 3
//                     },

//                 ]
//             }
//         })
//         const nota3_5 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota5: true

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota5: 3
//                     }

//                 ]
//             }
//         })
//         const nota4_1 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota1: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota1: 4
//                     }


//                 ]
//             }
//         })

//         const nota4_2 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota2: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },


//                     {
//                         nota2: 4
//                     }


//                 ]
//             }
//         })
//         const nota4_3 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota3: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota3: 4
//                     },

//                 ]
//             }
//         })
//         const nota4_4 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota4: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota4: 4
//                     },

//                 ]
//             }
//         })
//         const nota4_5 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota5: true

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota5: 4
//                     }

//                 ]
//             }
//         })
//         const nota5_1 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota1: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota1: 5
//                     }


//                 ]
//             }
//         })

//         const nota5_2 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota2: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },


//                     {
//                         nota2: 5
//                     }


//                 ]
//             }
//         })
//         const nota5_3 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota3: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota3: 5
//                     },

//                 ]
//             }
//         })
//         const nota5_4 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota4: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota4: 5
//                     },

//                 ]
//             }
//         })
//         const nota5_5 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota5: true

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota5: 5
//                     }

//                 ]
//             }
//         })

//         const nota6_1 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota1: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota1: 6
//                     }


//                 ]
//             }
//         })

//         const nota6_2 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota2: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },


//                     {
//                         nota2: 6
//                     }


//                 ]
//             }
//         })
//         const nota6_3 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota3: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota3: 6
//                     },

//                 ]
//             }
//         })
//         const nota6_4 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota4: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota4: 6
//                     },

//                 ]
//             }
//         })
//         const nota6_5 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota5: true

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota5: 6
//                     }

//                 ]
//             }
//         })
//         const nota7_1 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota1: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota1: 7
//                     }


//                 ]
//             }
//         })

//         const nota7_2 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota2: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },


//                     {
//                         nota2: 7
//                     }


//                 ]
//             }
//         })
//         const nota7_3 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota3: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota3: 7
//                     },

//                 ]
//             }
//         })
//         const nota7_4 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota4: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota4: 7
//                     },

//                 ]
//             }
//         })
//         const nota7_5 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota5: true

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota5: 7
//                     }

//                 ]
//             }
//         })
//         const nota8_1 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota1: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota1: 8
//                     }


//                 ]
//             }
//         })

//         const nota8_2 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota2: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },


//                     {
//                         nota2: 8
//                     }


//                 ]
//             }
//         })
//         const nota8_3 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota3: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota3: 8
//                     },

//                 ]
//             }
//         })
//         const nota8_4 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota4: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota4: 8
//                     },

//                 ]
//             }
//         })
//         const nota8_5 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota5: true

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota5: 8
//                     }

//                 ]
//             }
//         })
//         const nota9_1 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota1: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota1: 9
//                     }


//                 ]
//             }
//         })

//         const nota9_2 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota2: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },


//                     {
//                         nota2: 9
//                     }


//                 ]
//             }
//         })
//         const nota9_3 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota3: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota3: 9
//                     },

//                 ]
//             }
//         })
//         const nota9_4 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota4: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota4: 9
//                     },

//                 ]
//             }
//         })
//         const nota9_5 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota5: true

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota5: 9
//                     }

//                 ]
//             }
//         })
//         const nota10_1 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota1: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota1: 10
//                     }


//                 ]
//             }
//         })
//         const nota10_2 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota2: true,

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },


//                     {
//                         nota2: 10
//                     }


//                 ]
//             }
//         })
//         const nota10_3 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota3: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota3: 10
//                     },

//                 ]
//             }
//         })
//         const nota10_4 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {
//                 nota4: true,
//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },
//                     {
//                         nota4: 10
//                     },

//                 ]
//             }
//         })
//         const nota10_5 = await Prisma.newPrisma.historialnota.aggregate({
//             _count: {

//                 nota5: true

//             },
//             where: {
//                 AND: [
//                     {
//                         idmateria: 1
//                     },

//                     {
//                         nota5: 10
//                     }

//                 ]
//             }
//         })

//         const notas = [
//             {
//                 valorNota: 1,
//                 nota: nota1_1._count.nota1 + nota1_2._count.nota2 + nota1_3._count.nota3 + nota1_4._count.nota4 + nota1_5._count.nota5
//             },
//             {
//                 valorNota: 2,
//                 nota: nota2_1._count.nota1 + nota2_2._count.nota2 + nota2_3._count.nota3 + nota2_4._count.nota4 + nota2_5._count.nota5
//             },
//             {
//                 valorNota: 3,
//                 nota: nota3_1._count.nota1 + nota3_2._count.nota2 + nota3_3._count.nota3 + nota3_4._count.nota4 + nota3_5._count.nota5,
//             },
//             {
//                 valorNota: 4,
//                 nota: nota4_1._count.nota1 + nota4_2._count.nota2 + nota4_3._count.nota3 + nota4_4._count.nota4 + nota4_5._count.nota5,
//             },
//             {
//                 valorNota: 5,
//                 nota: nota5_1._count.nota1 + nota5_2._count.nota2 + nota5_3._count.nota3 + nota5_4._count.nota4 + nota5_5._count.nota5,
//             },
//             {
//                 valorNota: 6,
//                 nota: nota6_1._count.nota1 + nota6_2._count.nota2 + nota6_3._count.nota3 + nota6_4._count.nota4 + nota6_5._count.nota5,
//             },
//             {
//                 valorNota: 7,
//                 nota: nota7_1._count.nota1 + nota7_2._count.nota2 + nota7_3._count.nota3 + nota7_4._count.nota4 + nota7_5._count.nota5,
//             },
//             {
//                 valorNota: 8,
//                 nota: nota8_1._count.nota1 + nota8_2._count.nota2 + nota8_3._count.nota3 + nota8_4._count.nota4 + nota8_5._count.nota5,
//             },
//             {
//                 valorNota: 9,
//                 nota: nota9_1._count.nota1 + nota9_2._count.nota2 + nota9_3._count.nota3 + nota9_4._count.nota4 + nota9_5._count.nota5,
//             },
//             {
//                 valorNota: 10,
//                 nota: nota10_1._count.nota1 + nota10_2._count.nota2 + nota10_3._count.nota3 + nota10_4._count.nota4 + nota10_5._count.nota5
//             }










//         ]
//         return notas
//     } catch (error) {
//         console.log(error);
//     }
// }