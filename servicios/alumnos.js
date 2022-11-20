import { prisma } from "./../prisma/db";

export default async function traerAlumnos() {
    try {
        const alumnos = await prisma.alumnoXcursoXdivision.findMany({
            include: {
                usuario: true
            }
        })
        console.log(alumnos);
        return alumnos
    } catch (error) {
        console.error(error);
    }
}


