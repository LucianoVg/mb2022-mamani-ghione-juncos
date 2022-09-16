import Image from "next/image";
import styles from "../styles/tarjetaNoticias.module.css";
import { useAuth } from "./context/authUserProvider";
import { Card, CardContent, CardActions, Button, Typography, IconButton, Container } from "@mui/material";
import { useRouter } from "next/router";
import { Edit } from "@mui/icons-material";

const TarjetaNovedades = ({ id, url, titulo, descripcion }) => {
    const { authUser } = useAuth()
    const router = useRouter()

    return (
        <Container >
            <Card sx={{ maxWidth: 300, maxHeight: 450, }} className={`${styles.card}`} >
                <div className={` ${styles.overflow}`}>


                    <Image className={`${styles.card_img_top}`}
                        src={url}
                        width={300}
                        height={300}
                        layout="responsive"
                        alt="Card image cap" />
                    {
                        authUser && (
                            // <a className={`${styles.btn}`} onClick={() => router.push(`/gestion/noticias/${id}`)}>
                            //     
                            // </a>
                            <IconButton className={`${styles.btn}`} onClick={() => router.push(`/gestion/noticias/${id}`)}>
                                <Edit />
                            </IconButton>
                        )
                    }


                </div>

                <CardContent>
                    <Typography gutterBottom variant="h5">{titulo.substring(0, 30) + '...'}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {descripcion.substring(0, 39) + '...'}
                    </Typography>
                    <CardActions>
                        <Button onClick={() => router.push(`/gestion/noticias/detalles/${id}`)}>Mas info</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Container>
    )
}

export default TarjetaNovedades