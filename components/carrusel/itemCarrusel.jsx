import { Paper, Typography } from "@mui/material";
import Image from "next/image";

export function Item({ portada }) {
    return (
        <Paper >
            <Image
                src={portada?.url || '/assets/img/placeholder.png'}
                alt={portada?.nombre}
                width={1200}
                height={500}
                layout="responsive" />
        </Paper>
    )
}