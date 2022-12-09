import { Prisma } from "./prisma";

export async function traerDivision() {
    try {
        const division = await Prisma.newPrisma.division.findMany({
            orderBy: {
                division: 'asc'
            }
        })
        return division
    } catch (error) {
        console.log(error);
    }
}