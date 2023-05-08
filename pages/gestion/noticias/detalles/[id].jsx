import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../../components/layout";
import { Container, Box, Grid, Typography, IconButton, Button } from "@mui/material";
import Loading from "../../../../components/loading";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function DetallesNoticia() {
    const [noticia, setNoticia] = useState({
        id: 0,
        titulo: '',
        descripcion: '',
        url: '',
        idUsuario: 0
    })
    const [cargando, setCargando] = useState(false)
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        traerNoticia()
    }, [id])

    const traerNoticia = async () => {
        if (id) {
            setCargando(true)
            const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/detalles/${id}`)
            if (res.status === 200) {
                console.log(res.data);
                setNoticia(res.data)
                setCargando(false)
            }
        }
    }
    return (
        <Layout>
            <Container sx={{ marginTop: "100px", textAlign: 'center' }} >
                <Button variant="outlined" sx={{border: "none", float: 'left',}}
                 className="buttonRegresar" 
                 href="/"
                 startIcon={<ArrowBackIosIcon />}
                 >
                    Regresar
                </Button>
                <Typography variant="h4" 
            sx={{marginBottom:"30px"}}
            >
                Detalles de Noticia</Typography>
                {
                    !cargando && noticia.id !== 0 && (


                        <Grid container
                            direction="column"
                            justifyContent="center"
                            spacing={8}

                        >
                            <Grid item xs={12} >

                                <Image alt="noticia" src={noticia.url !== '' ? noticia.url : '/assets/img/placeholder.png'} width="600" height="400"
                                    style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", border: '0 10px 15px black', borderRadius: '15px' }}

                                />

                            </Grid>
                            <Grid item xs >
                                <Box

                                >
                                    <Typography component={'h3'}
                                        variant="h4"
                                        id="fontSize"
                                    >
                                        {noticia.titulo}</Typography>
                                    <Typography component={'p'}
                                        variant="p"
                                        id="fontSize2"
                                        style={{
                                            marginTop: "40px",
                                            textAlign: "justify",
                                            textJustify: "inter-word"
                                        }}
                                    >
                                        {noticia.descripcion}</Typography>
                                </Box>
                            </Grid>
                        </Grid>



                    )
                }

                {
                    cargando && (
                        <Container sx={{ top: "60%", left: "70%" }}>
                            <Loading/>
                        </Container>

                    )
                }
            </Container>



        </Layout >
    )
}