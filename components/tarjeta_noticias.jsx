import styles from "../styles/tarjetaNoticias.module.css";
import { useAuth } from "./context/authUserProvider";
import { Card, CardContent, Box, CardActions, Button, Typography, IconButton, CardMedia } from "@mui/material";
import { useRouter } from "next/router";
import { Edit } from "@mui/icons-material";

const TarjetaNovedades = ({ id, url, titulo, descripcion }) => {
    const { authUser } = useAuth()
    const router = useRouter()

    return (
        <Box xs={3}>
            <Card
                className={`${styles.card}`}>
                <div style={{ position: 'relative' }}>
                    <div className={` ${styles.overflow}`} >
                        <CardMedia
                            className={`${styles.card_img_top}`}
                            component="img"
                            image={url}
                            alt="imagen"
                        />
                        {
                            authUser && (
                                <a href={`/gestion/noticias/${id}`} style={{ position: 'absolute', left: 250, bottom: 235, }} >
                                    <IconButton  >
                                        <Edit style={{ color: 'black', fontSize: '27px' }} />
                                    </IconButton>
                                </a>
                            )
                        }
                    </div>
                </div>
                <CardContent  >
                    <Typography gutterBottom variant="h5" component="div">
                        {titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`${descripcion.substring(0, 30)}...`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => router.push(`/gestion/noticias/detalles/${id}`)} size="small" sx={{ mb: 2 }}>Mas info.</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default TarjetaNovedades