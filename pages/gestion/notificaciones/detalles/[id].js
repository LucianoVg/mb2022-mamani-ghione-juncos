import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../../components/layout";
import Loading from "../../../../components/loading";
import { Box, Button, Card, Stack, TextareaAutosize, Typography, TextField, CardContent, CardActions, IconButton, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, } from "@mui/material";
import styles from "../../../../styles/fontSize.module.css"
import React from 'react';

// import { createStyles, makeStyles } from "@mui/styles";


// const useStyles = makeStyles(
//     createStyles({
//         name: { "font-size": "50px" }
//     })
// );





export default function DetallesNoticia() {
    const [detalles, setDetalles] = useState()
    const [cargando, setCargando] = useState(true)

    const [notificacion, setNotificacion] = useState({
        asunto: '',
        contenido: ''
    })

    const handleNotificacion = (e) => {
        setNotificacion({ ...notificacion, [e.target.name]: e.target.value })
    }

    console.log(notificacion.asunto)
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        if (id) {
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/detalles/${id}`)
                .then(res => {
                    console.log(res.data);
                    setDetalles(res.data)
                }).catch(err => {
                    console.error(err);
                })
        }
        setCargando(false)

    }, [id, cargando])

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const onSave = (id) => {
        const res = axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/update/${id}`, {
            asunto: asunto,
            contenido: contenido
        })
        console.log(res.data);
        onCancel()

    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })

    }


    const asuntoDetalle = detalles && detalles.map(n =>
        n.notificacion?.asunto
    )


    // const classes = useStyles(props);
  const [actualizar, setActualizar] = useState({
    asunto: '',
    contenido: ''
  })
  const handleActualizar = (e) => {
    setActualizar({ ...Actualizar, [e.target.name]: e.target.value })
}

    console.log(actualizar)
    const [isNameFocused, setIsNamedFocused] = useState(false);

    return (
        <Layout>
            {
                detalles && detalles.map((n, i) => (



                    n.id !== '' && (


                        <div className="container text-center">



                            <Card sx={{ minWidth: '300px', height: '400px', boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)', backgroundColor: 'white', borderRadius: '30px' }}>



                                <div >
                                    {!isNameFocused ? (
                                        <Box>

                                            <Button variant="contained"
                                                sx={{ marginLeft: '30px', marginTop: '20px' }}
                                                onClick={() => {
                                                    setIsNamedFocused(true);
                                                }}>
                                                Editar
                                            </Button>
                                            <Grid>
                                                <Grid item >
                                                    <Typography textAlign="center" variant={'h6'}
                                                        sx={{ marginBottom: '30px', marginTop: '20px', marginLeft: '30px', marginRight: '30px' }}
                                                        className={`${styles.Typography}`}
                                                    ><strong>{n.notificacion?.asunto}</strong> </Typography>

                                                </Grid>
                                                <Grid item >
                                                    <Typography variant={'body2'}
                                                        sx={{ marginBottom: '30px', marginLeft: '30px', marginRight: '20px' }}
                                                        className={`${styles.Typography2}`}
                                                    >{n.notificacion?.contenido} </Typography>
                                                </Grid>
                                                <Grid item >

                                                    <Typography variant="caption" sx={{ marginBottom: '30px', marginLeft: '30px' }}
                                                        className={`${styles.Typography3}`}
                                                    > <strong>Atte. {n.usuario?.rol?.tipo}</strong></Typography>
                                                </Grid>
                                            </Grid>

                                        </Box>
                                    ) : (

                                        <Box>
                                            <Stack spacing={1} direction="row" sx={{ marginLeft: '30px', marginTop: '19px' }}>
                                                <Button variant="contained" color="success"

                                                    onClick={(e) => onSave(n.notificacion?.id)}
                                                >
                                                    Actualizar
                                                </Button>

                                                <Button variant="contained" color="error"
                                                    sx={{ marginLeft: '40px', marginTop: '20px' }}
                                                    onClick={() => {
                                                        setIsNamedFocused(false);
                                                    }}>
                                                    Cancelar
                                                </Button>
                                            </Stack>

                                            <Grid>
                                                <Grid item>
                                                    <TextField
                                                        variant="standard"
                                                        autoFocus
                                                        fullWidth
                                                        multiline
                                                        sx={{ alignItems: 'center' }}
                                                        maxRows={2}
                                                        inputProps={
                                                            {
                                                                className: styles.Typography,
                                                                style: {
                                                                    fontWeight: 'bold',
                                                                    textAlign: 'center',
                                                                    marginBottom: '24.6px', marginTop: '20.5px', marginLeft: '30px', marginRight: '30px'
                                                                },
                                                                disableUnderline: true
                                                            }

                                                        }
                                                        name='asunto'
                                                        value={n.notificacion?.asunto}
                                                        onChange={handleActualizar}

                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <TextField
                                                        variant="standard"
                                                        multiline
                                                        autoFocus
                                                        fullWidth
                                                        maxRows={7}

                                                        inputProps={
                                                            {
                                                                className: styles.Typography2,
                                                                style: {
                                                                    marginBottom: '25px', marginLeft: '30px', marginRight: '20px'

                                                                }
                                                            }

                                                        }
                                                        name='contenido'
                                                        value={n.notificacion?.contenido}
                                                        onChange={handleActualizar}

                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="caption" sx={{ marginBottom: '30px', marginLeft: '30px' }}
                                                        className={`${styles.Typography3}`}
                                                    > <strong>Atte. {n.usuario?.rol?.tipo}</strong>
                                                    </Typography>
                                                </Grid>
                                            </Grid>







                                        </Box>
                                    )}
                                </div>



                                {/* 
                                {

                                    inEditMode.status && inEditMode.rowKey === i ? (

                                        <React.Fragment>
                                            <Stack spacing={1} direction="row" sx={{ marginLeft: '40px', marginTop: '20px' }}>
                                                <Button variant="contained" color="success"

                                                    onClick={(e) => onSave(n.notificacion?.id)}
                                                >
                                                    Actualizar
                                                </Button>

                                                <Button variant="contained" color="error"


                                                    onClick={() => onCancel()}
                                                >
                                                    Cancelar
                                                </Button>
                                            </Stack>
                                        </React.Fragment>
                                    ) : (

                                        <React.Fragment>
                                            <Button variant="contained"
                                                sx={{ marginLeft: '40px', marginTop: '20px' }}
                                                onClick={() => setInEditMode({
                                                    status: true,
                                                    rowKey: i
                                                })}
                                            >Editar
                                            </Button>
                                        </React.Fragment>
                                    )
                                }

                                {
                                    inEditMode.status && inEditMode.rowKey === i ? (
                                        <Box direction='column' >

                                            <FormControl >
                                                <input
                                                   d
                                                    className="MuiTypography-root MuiTypography-h4 MuiTypography-displayInline"
                                                    name="asunto"
                                                    defaultValue={n.notificacion?.asunto}
                                                    value={notificacion.asunto}
                                                    onChange={handleNotificacion}
                                                />
                                                <Typography style={{ display: "none" }} />
                                             

                                                <TextField
                                                    multiline
                                                    maxRows={10}
                                                    name="contenido"
                                                    value={notificacion.contenido}
                                                    placeholder={n.notificacion?.contenido}
                                                    onChange={handleNotificacion}
                                                    style={{ width: '350px', height: '100px' }}
                                                    variant="standard"

                                                />
                                            </FormControl>

                                            <Box>
                                                <Typography variant="caption" sx={{ marginBottom: '30px', marginLeft: '30px' }}
                                                    className={`${styles.Typography3}`}
                                                > <strong>Atte. {n.usuario?.rol?.tipo}</strong>
                                                </Typography>
                                            </Box>
                                        </Box>


                                    )
                                        : (
                                          

                                        )}
 */}






                            </Card>

                        </div >
                    )
                ))


            }
            {
                cargando && (
                    <Loading />
                )
            }
        </Layout >
    )
}