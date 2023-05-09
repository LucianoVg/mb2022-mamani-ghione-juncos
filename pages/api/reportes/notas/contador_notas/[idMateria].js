import NextCors from "nextjs-cors";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
     try {
          await NextCors(req, res, {
               // Options
               methods: ['GET'],
               origin: process.env.HOST,
               optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
          });
          const { idMateria } = req.query
          const contar = await contarNotas(idMateria)
          return res.status(200).json(contar)
     } catch (error) {
          console.log(error);
          return res.status(500).json(error.message)
     }
}
async function contarNotas(idMateria) {
     try {
          let anoActual = new Date().getFullYear()
          const conteo = await db.$queryRaw`SELECT n.idmateria,
        (
             (select count(*) from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision
             where   nota1= 1   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota2= 1    and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota3= 1  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota4= 1   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where    nota5= 1  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') 
        ) as nota1,
        (
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota1= 2  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota2= 2  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota3= 2  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota4= 2   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where    nota5= 2  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') 
        ) as nota2,
        (
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota1= 3   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota2= 3  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota3= 3  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota4=3   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where    nota5= 3  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') 
        ) as nota3,
        (
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota1= 4   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota2= 4  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota3= 4  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota4= 4   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where    nota5= 4 and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') 
        ) as nota4,
        (
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota1= 5   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota2= 5  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota3= 5  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota4= 5  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where    nota5= 5  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') 
        ) as nota5,
        (
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota1= 6   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota2= 6 and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota3= 6  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota4= 6   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where    nota5= 6  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') 
        ) as nota6,
        (
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota1= 7   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota2= 7  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota3= 7  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota4= 7   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where    nota5= 7 and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') 
        ) as nota7,
        (
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota1= 8   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota2= 8  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota3= 8  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota4= 8   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where    nota5= 8  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') 
        ) as nota8,
        (
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota1= 9   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A' )+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota2= 9  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota3= 9  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')  +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota4= 9   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where    nota5= 9  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') 
        ) as nota9,
        (
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota1= 10   and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota2= 10 and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota3= 10  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A')+
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota4= 10  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') +
             (select count(*)  from nota as n     
             inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
             inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
             inner join division as d on d.id = cd.iddivision where   nota5= 10  and idmateria =${Number(idMateria)} and anoactual = ${Number(anoActual)} and d.division like 'A') 
        ) as nota10
        from nota as n
        inner join materia as m on m.id = n.idmateria
     --    inner join alumnoxcursoxdivision as a on a.id = n.idalumnoxcursoxdivision
     --    inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
     --    inner join division as d on d.id = cd.iddivision
     --    inner join docentexmateria as dm on m.id = dm.idmateria
     --    inner join usuario as u on u.id = dm.idusuario
        where idmateria= ${Number(idMateria)} and anoactual = ${Number(anoActual)}
        group by n.idmateria`

          var string = JSON.stringify(conteo, (_, v) => typeof v === 'bigint' ? v.toString() : v)
          let notas = JSON.parse(string)
          return notas

     } catch (error) {
          console.log(error);
     }
}