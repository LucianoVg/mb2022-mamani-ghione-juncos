import NextCors from "nextjs-cors";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
     try {
          await NextCors(req, res, {
               // Options
               methods: ['GET'],
               origin: '*',
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
          const conteo = await db.$queryRaw`SELECT n.idmateria,
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