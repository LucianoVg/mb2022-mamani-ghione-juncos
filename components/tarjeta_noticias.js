import Image from "next/image";
import styles from "../styles/tarjetaNoticias.module.css";
import { useAuth } from "./context/authUserProvider";
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const TarjetaNovedades = ({ id, url, titulo, descripcion }) => {
    const { authUser } = useAuth()
    const router = useRouter()

    return (
        <Card sx={{ maxWidth: 345 }} className={`${styles.card}`} >
            <div className={`${styles.overflow}`}>
                <Image className={`${styles.card_img_top}`}
                    src={url}
                    width={300}
                    height={300}
                    layout="responsive"
                    alt="Card image cap" />

                {
                    authUser && (
                        <a className={`${styles.btn}`} href={`/gestion/noticias/${id}`}>
                            <i className='bx bx-edit'></i>
                        </a>
                    )
                }
            </div>

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{titulo.substring(0, 30) + '...'}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {descripcion.substring(0, 39) + '...'}
                </Typography>
                <CardActions>
                    <Button onClick={() => router.push(`/gestion/noticias/detalles/${id}`)}>Mas info</Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default TarjetaNovedades