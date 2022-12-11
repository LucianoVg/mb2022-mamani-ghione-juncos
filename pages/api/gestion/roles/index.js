import NextCors from "nextjs-cors/dist";
import traerRoles from "../../servicios/roles";

export default async function handler(
    req,
    res
) {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    try {
        const roles = await traerRoles()
        return res.status(200).json(roles)
    } catch (error) {
        return res.status(400).send(error)
    }
}