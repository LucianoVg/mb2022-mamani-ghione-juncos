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

export async function PromedioXtrimestre(idAlumno, idMateria) {
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
       where idalumnoxcursoxdivision =53 and idmateria = 1
       order by m.nombre asc, t.trimestre asc`
    } catch (error) {
        console.error(error);
    } finally {
        Prisma.disconnect()
    }
}

export async function notasTrimestres(idAlumno, idMateria) {
    try {
        return await Prisma.newPrisma().$queryRaw`select m.nombre as materia ,idtrimestre as id,nota1,nota2,nota3,nota4,nota5 from historialnota hn
         INNER JOIN materia as m ON m.id = hn.idmateria
        where idmateria = 1 and idalumnoxcursoxdivision = 53
        group by idtrimestre,nota1,nota2,nota3,nota4,nota5, m.nombre`

    } catch (error) {
        console.log(error);
    }
}



export async function contarNotas() {
    try {
        const conteo = await Prisma.newPrisma().$queryRaw`SELECT n.idmateria,
        (
             (select count(*) from historialnota where nota1= 1   and idmateria =2)+
             (select count(*) from historialnota where nota2= 1    and idmateria =2) +
             (select count(*) from historialnota where nota3= 1  and idmateria =2)+
             (select count(*) from historialnota where nota4= 1   and idmateria =2) +
             (select count(*) from historialnota where  nota5= 1  and idmateria =2) 
        ) as nota1,
        (
             (select count(*) from historialnota where nota1= 2  and idmateria =2)+
             (select count(*) from historialnota where nota2= 2  and idmateria =2) +
             (select count(*) from historialnota where nota3= 2  and idmateria =2)+
             (select count(*) from historialnota where nota4= 2   and idmateria =2) +
             (select count(*) from historialnota where  nota5= 2  and idmateria =2) 
        ) as nota2,
        (
             (select count(*) from historialnota where nota1= 3   and idmateria =2)+
             (select count(*) from historialnota where nota2= 3  and idmateria =2) +
             (select count(*) from historialnota where nota3= 3  and idmateria =2)+
             (select count(*) from historialnota where nota4=3   and idmateria =2) +
             (select count(*) from historialnota where  nota5= 3  and idmateria =2) 
        ) as nota3,
        (
             (select count(*) from historialnota where nota1= 4   and idmateria =2)+
             (select count(*) from historialnota where nota2= 4  and idmateria =2) +
             (select count(*) from historialnota where nota3= 4  and idmateria =2)+
             (select count(*) from historialnota where nota4= 4   and idmateria =2) +
             (select count(*) from historialnota where  nota5= 4 and idmateria =2) 
        ) as nota4,
        (
             (select count(*) from historialnota where nota1= 5   and idmateria =2)+
             (select count(*) from historialnota where nota2= 5  and idmateria =2) +
             (select count(*) from historialnota where nota3= 5  and idmateria =2) +
             (select count(*) from historialnota where nota4= 5  and idmateria =2) +
             (select count(*) from historialnota where  nota5= 5  and idmateria =2) 
        ) as nota5,
        (
             (select count(*) from historialnota where nota1= 6   and idmateria =2)+
             (select count(*) from historialnota where nota2= 6 and idmateria =2) +
             (select count(*) from historialnota where nota3= 6  and idmateria =2)+
             (select count(*) from historialnota where nota4= 6   and idmateria =2) +
             (select count(*) from historialnota where  nota5= 6  and idmateria =2) 
        ) as nota6,
        (
             (select count(*) from historialnota where nota1= 7   and idmateria =2)+
             (select count(*) from historialnota where nota2= 7  and idmateria =2) +
             (select count(*) from historialnota where nota3= 7  and idmateria =2)+
             (select count(*) from historialnota where nota4= 7   and idmateria =2) +
             (select count(*) from historialnota where  nota5= 7 and idmateria =2) 
        ) as nota7,
        (
             (select count(*) from historialnota where nota1= 8   and idmateria =2)+
             (select count(*) from historialnota where nota2= 8  and idmateria =2) +
             (select count(*) from historialnota where nota3= 8  and idmateria =2)+
             (select count(*) from historialnota where nota4= 8   and idmateria =2) +
             (select count(*) from historialnota where  nota5= 8  and idmateria =2) 
        ) as nota8,
        (
             (select count(*) from historialnota where nota1= 9   and idmateria =2)+
             (select count(*) from historialnota where nota2= 9  and idmateria =2) +
             (select count(*) from historialnota where nota3= 9  and idmateria =2)  +
             (select count(*) from historialnota where nota4= 9   and idmateria =2) +
             (select count(*) from historialnota where  nota5= 9  and idmateria =2) 
        ) as nota9,
        (
             (select count(*) from historialnota where nota1= 10   and idmateria =2)+
             (select count(*) from historialnota where nota2= 10 and idmateria =2) +
             (select count(*) from historialnota where nota3= 10  and idmateria =2)+
             (select count(*) from historialnota where nota4= 10  and idmateria =2) +
             (select count(*) from historialnota where  nota5= 10  and idmateria =2) 
        ) as nota10
        FROM historialnota as n
        where idmateria= 2
        group by n.idmateria`

        return JSON.stringify(conteo, (_, v) => typeof v === 'bigint' ? v.toString() : v)

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
