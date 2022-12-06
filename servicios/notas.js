import { Prisma } from "./prisma";


export async function Preanalitico(idAlumno) {
    try {
        return await Prisma.newPrisma().$queryRaw`select m.id as id ,m.nombre as materia, m.idcurso as curso , idalumnoxcursoxdivision,
        avg ((SELECT AVG(c)
               FROM   (VALUES(nota1),
                             (nota2),
                             (nota3),
                             (nota4),
                             (nota5)) T (c))) as notafinal
       from historialnota as hn
       INNER JOIN materia as m ON m.id = hn.idmateria
       where idalumnoxcursoxdivision = 53
       group by  m.nombre, idalumnoxcursoxdivision, m.idcurso, m.id
       order by m.idcurso asc, m.id asc`
    } catch (error) {
        console.error(error);
    } finally {
        Prisma.disconnect()
    }
}

export async function PromedioXtrimestre(idAlumno) {
    try {
        return await Prisma.newPrisma().$queryRaw`select m.nombre as materia, idalumnoxcursoxdivision,t.trimestre as trimestre,
        (SELECT AVG(c)
               FROM   (VALUES(nota1),
                             (nota2),
                             (nota3),
                             (nota4),
                             (nota5)) T (c)) AS Promedio
       from historialnota as hn
       INNER JOIN materia as m ON m.id = hn.idmateria
       INNER JOIN trimestre as t ON t.id = hn.idtrimestre
       where idalumnoxcursoxdivision =53 and idmateria = 5
       order by m.nombre asc, t.trimestre asc`
    } catch (error) {
        console.error(error);
    } finally {
        Prisma.disconnect()
    }
}

export async function notasTrimestres() {
    try {
        return await Prisma.newPrisma().$queryRaw`select idtrimestre,nota1,nota2,nota3,nota4,nota5 from historialnota 
        where idmateria = 1 and idalumnoxcursoxdivision = 53
        group by idtrimestre,nota1,nota2,nota3,nota4,nota5`
       
    } catch (error) {
        console.log(error);
    }
}




export async function contarNotas() {
    try {
        const count = await Prisma.newPrisma().nota.aggregate({
            _count: ['nota1', 'nota2', 'nota3', 'nota4', 'nota5']
        })
        console.log(count);
        return count
    } catch (error) {
        console.log(error);
    }
}


export async function TraerNotas(options) {
    try {
        return await Prisma.newPrisma().nota.findMany(options)
    } catch (error) {
        console.error(error);
    } finally {
        Prisma.disconnect()
    }
}


export async function updateNota(idNota, nota1, nota2, nota3, nota4, nota5,
    columna1, columna2, columna3, columna4, columna5) {
    try {
        let notas = []
        if (columna1) {
            const newNota1 = await Prisma.newPrisma().nota.update({
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
            const newNota2 = await Prisma.newPrisma().nota.update({
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
            const newNota3 = await Prisma.newPrisma().nota.update({
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
            const newNota4 = await Prisma.newPrisma().nota.update({
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
            const newNota5 = await Prisma.newPrisma().nota.update({
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
    } finally {
        Prisma.disconnect()
    }
}
