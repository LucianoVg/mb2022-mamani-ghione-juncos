import styles from "../styles/tarjetaNoticias.module.css";
import { useAuth } from "./context/authUserProvider";
import { Card, CardContent, Box, CardActions, Button, Typography, IconButton, CardMedia } from "@mui/material";
import { useRouter } from "next/router";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from 'react'
import axios from 'axios'


const TarjetaNovedades = ({ id, url, titulo, descripcion }) => {
    const { authUser } = useAuth()
    const router = useRouter()
    const [usuario, setUsuario] = useState()


    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario(res.data)
        }
    }

    useEffect(() => {
        traerUsuario()
    }, [])

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
                            authUser && (usuario?.rol?.tipo === 'Director' || usuario?.rol?.tipo === 'Administrador' || usuario?.rol?.tipo === 'Vicedirector') && (
                                <a href={`/gestion/noticias/${id}`} style={{ position: 'absolute', left: 225, bottom: 235, }} >
                                    <IconButton  >
                                        <Edit style={{ color: 'black', fontSize: '27px' }} />
                                    </IconButton>
                                </a>
                            )
                        }
                    </div>
                </div>
                <CardContent  >
                    <Typography gutterBottom variant="h5" component="div" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                        <strong>  {titulo}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`${descripcion.substring(0, 50)}...`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button className="button-61" onClick={() => router.push(`/gestion/noticias/detalles/${id}`)} size="small" sx={{ marginLeft: "10px" }}>Mas info.</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default TarjetaNovedades