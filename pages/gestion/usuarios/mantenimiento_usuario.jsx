
import { Button, Container, Grid, Pagination, Paper, Table, TableBody, Stack, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import TextField from '@mui/material/TextField';
import { Search } from "@mui/icons-material";
import Loading from "../../../components/loading";
import { usePagination } from "../../../components/hooks/paginationHook";

export default function MantenimientoUsuario() {
    const [usuarios, setUsuarios] = useState([])
    const router = useRouter()
    const { loading, authUser } = useAuth()
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [legajo, setLegajo] = useState("")
    const queryParams = []
    const pageSize = 5
    const cantidadPaginas = Math.ceil(usuarios?.length / pageSize)
    const paginacion = usePagination(usuarios || [], pageSize)
    const [pagina, setPagina] = useState(1)
    const [cargandoInfo, setCargandoInfo] = useState(false)
    const [usuario, setUsuario] = useState({ rol: '' })

    const handlerCambioPagina = (e, pagina) => {
        setPagina(pagina)
        paginacion.saltar(pagina)
    }
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        if (usuario.rol) {
            if (!tienePermisos()) {
                router.push('/error')
            } else {
                traerUsuarios()
            }
        }
    }, [authUser, loading, usuario.id, usuario.rol])

    const tienePermisos = () => {
        return usuario.rol === 'Administrador'
            || usuario.rol === 'Secretario'
    }
    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario({ rol: res.data?.rol?.tipo })
        }
    }
    const traerUsuarios = async () => {
        if (legajo) {
            queryParams.push({ legajo })
        }
        if (nombre) {
            queryParams.push({ nombre })
        }
        if (apellido) {
            queryParams.push({ apellido })
        }
        let params = ""
        queryParams.forEach(qp => {
            for (const key in qp) {
                params += `${key}=${qp[key]}&`
            }
        })
        setCargandoInfo(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/usuarios?${params}`)
        if (res.data) {
            setUsuarios(res.data)
            limpiarCampos()
        }
        setCargandoInfo(false)
    }
    const limpiarCampos = () => {
        setNombre("")
        setApellido("")
        setLegajo("")
    }
    const handleNombre = (e) => {
        setNombre(e.target.value)
    }
    const handleLegajo = (e) => {
        setLegajo(e.target.value)
    }
    const handleApellido = (e) => {
        setApellido(e.target.value)
    }

    return (
        <Layout>
            {
                usuario.rol === 'Administrador' && (
                    <Link href={'/gestion/usuarios/nuevo'}>
                        <Button variant="outlined">Nuevo Usuario</Button>
                    </Link>
                )
            }
            <Typography variant="h4" sx={{ textAlign: 'center', m: 2 }}>Usuarios del Sistema</Typography>

            <Grid container xs={12}>
                <Grid item md={'auto'} m={1}>
                    <TextField
                        name="legajo"
                        value={legajo}
                        type="number"
                        onChange={handleLegajo}
                        variant="outlined"
                        label="Legajo" />
                </Grid>
                <Grid item md={'auto'} m={1}>
                    <TextField
                        name="nombre"
                        value={nombre}
                        onChange={handleNombre}
                        variant="outlined"
                        label="Nombre" />
                </Grid>
                <Grid item md={'auto'} m={1}>
                    <TextField
                        name="apellido"
                        value={apellido}
                        onChange={handleApellido}
                        variant="outlined"
                        label="Apellido" />
                </Grid>
                <Grid item md={'auto'} m={1}>
                    <Button
                        variant="outlined"
                        endIcon={<Search />}
                        color="info"
                        onClick={traerUsuarios}>
                        Buscar
                    </Button>
                </Grid>
            </Grid>

            {
                !cargandoInfo && (
                    <TableContainer sx={{ marginTop: '20px' }} component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Rol</TableCell>
                                    <TableCell align="center">Legajo</TableCell>
                                    <TableCell align="center">Nombre</TableCell>
                                    <TableCell align="center">Apellido</TableCell>
                                    <TableCell align="center">Correo</TableCell>
                                    <TableCell align="center">Direccion</TableCell>
                                    <TableCell align="center">Telefono</TableCell>
                                    <TableCell align="center">Localidad</TableCell>
                                    <TableCell align="center">Accion</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginacion.dataActual().map((u, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="right">{u.rol?.tipo}</TableCell>
                                        <TableCell align="right">{u.legajo}</TableCell>
                                        <TableCell align="right">{u.nombre}</TableCell>
                                        <TableCell align="right">{u.apellido}</TableCell>
                                        <TableCell align="right">{u.correo}</TableCell>
                                        <TableCell align="right">{u.direccion}</TableCell>
                                        <TableCell align="right">{u.telefono}</TableCell>
                                        <TableCell align="right">{u.localidad}</TableCell>

                                        <TableCell align="right">
                                            <Stack spacing={1} direction="row">
                                                <Button variant="contained"
                                                    sx={{ backgroundColor: 'lightblue', color: 'black' }}
                                                // onClick={() => onSave(a?.id)}
                                                >
                                                    Editar
                                                </Button>
                                                <Button variant="contained"
                                                    color="secondary"
                                                // onClick={() => onCancel()}
                                                >
                                                    Eliminar
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
            {
                cargandoInfo && (
                    <Container sx={{ textAlign: 'center' }}>
                        <Loading size={80} />
                    </Container>
                )
            }
            {
                !cargandoInfo && usuarios.length > 0 && (
                    <Container maxWidth={'lg'}
                        sx={{ marginTop: 2, width: 'fit-content', textAlign: 'center' }}>
                        <Pagination
                            count={cantidadPaginas}
                            size='large'
                            page={pagina}
                            variant="outlined"
                            shape='circular'
                            onChange={handlerCambioPagina} />
                    </Container>
                )
            }
        </Layout>
    )
}