
import { Button, Container, Grid, Pagination, Popover, InputLabel, Select, Tooltip, Badge, List, ListItem, ListItemButton, ListItemText, Popper, Paper, ClickAwayListener, Grow, MenuList, Table, MenuItem, Menu, IconButton, Box, Autocomplete, FormControl, TableBody, Stack, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import TextField from '@mui/material/TextField';
import { Search } from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Loading from "../../../components/loading";
import { usePagination } from "../../../components/hooks/paginationHook";

export default function MantenimientoUsuario() {
    const [usuarios, setUsuarios] = useState([])
    const router = useRouter()
    const { loading, authUser } = useAuth()
    // const [nombre, setNombre] = useState("")
    // const [apellido, setApellido] = useState("")
    // const [legajo, setLegajo] = useState("")
    const queryParams = []
    const pageSize = 5
    const cantidadPaginas = Math.ceil(usuarios?.length / pageSize)
    const paginacion = usePagination(usuarios || [], pageSize)
    const [pagina, setPagina] = useState(1)
    const [cargandoInfo, setCargandoInfo] = useState(false)
    const [usuario, setUsuario] = useState({ rol: '' })
    const [rol, setRol] = useState(0)
    const [roles, setRoles] = useState([])


    const handlerCambioPagina = (e, pagina) => {
        setPagina(pagina)
        paginacion.saltar(pagina)
    }
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        // listarUsuarios()
        traerRoles()
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
        // if (legajo) {
        //     queryParams.push({ legajo })
        // }
        // if (nombre) {
        //     queryParams.push({ nombre })
        // }
        // if (apellido) {
        //     queryParams.push({ apellido })
        // }
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
            // limpiarCampos()
        }
        setCargandoInfo(false)
    }
    // const limpiarCampos = () => {
    //     setNombre("")
    //     setApellido("")
    //     setLegajo("")
    // }
    const traerRoles = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/roles`)
        if (res.status === 200) {
            console.log(res.data);
            setRoles(res.data)
        }
    }
    const handleRol = (e) => {
        setRol(e.target.value)

    }





    const [idUsuario, setIdUsuario] = useState(0)

    const listarUsuarios = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/`)
        if (res.status === 200) {
            console.log(res.data);
            setAlumnos(res.data)
        }
    }

    const handleUsuario = (e, newValue) => {
        if (newValue) {
            setIdUsuario(newValue.id);
        }
    }

    // const handleNombre = (e) => {
    //     setNombre(e.target.value)
    // }
    // const handleLegajo = (e) => {
    //     setLegajo(e.target.value)
    // }
    // const handleApellido = (e) => {
    //     setApellido(e.target.value)
    // }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        if (!localStorage.getItem('vistas')) {
            localStorage.setItem('vistas', true)
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Layout>
            <div >
                {
                    usuario.rol === 'Administrador' && (
                        <Link href={'/gestion/usuarios/nuevo'}>
                            <Button variant="contained">Nuevo Usuario</Button>
                        </Link>
                    )
                }
                <Typography variant="h4" sx={{ textAlign: 'center', m: 2 }}>Usuarios del Sistema</Typography>
                <Box direction='row'>
                    <FormControl style={{ marginRight: "20px", marginBottom: "25px" }}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            // value={value}
                            name="idUsuario"
                            onChange={handleUsuario}
                            getOptionLabel={(usuario) => `${usuario?.apellido} ${usuario?.nombre}`}
                            options={usuarios}
                            sx={{ width: "250px" }}
                            isOptionEqualToValue={(option, value) =>
                                option?.apellido === value?.apellido
                            }
                            noOptionsText={"No existe un usuario con ese nombre"}
                            renderOption={(props, usuario) => (
                                <Box component="li" {...props} key={usuario?.id}>
                                    {usuario?.apellido} {usuario?.nombre}
                                </Box>
                            )}
                            renderInput={(params) => <TextField {...params} label="Usuarios" />}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="select-label">Rol</InputLabel>
                        <Select labelId="select-label"
                            name="rol"
                            label="Rol"
                            onChange={handleRol}
                            value={rol}
                            sx={{ width: '170px' }}
                            MenuProps={{ disableScrollLock: true }}
                        >

                            {
                                roles && roles.map((r, i) => (
                                    <MenuItem key={i} value={r.id}>{r.tipo}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>

                {/* <Grid container xs={12}>
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
            </Grid> */}

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



                                                <IconButton onClick={handleClick}>

                                                    <MoreVertIcon sx={{ cursor: 'pointer', color: 'black' }} />

                                                </IconButton>


                                                <Popover
                                                    id={id}
                                                    open={open}
                                                    anchorEl={anchorEl}

                                                    onClose={handleClose}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                    PaperProps={{
                                                        style: { width: '100px', boxShadow: "0px 0px 6px 1px rgb(0 0 0 / 0.2)", position: "fixed" },
                                                    }}
                                                  

                                                >
                                                    <List>
                                                        <ListItem
                                                            disablePadding
                                                        >
                                                            <ListItemButton component="a" >
                                                                <ListItemText primary="Detalles" />
                                                            </ListItemButton>
                                                        </ListItem>
                                                        <ListItem
                                                            disablePadding
                                                        >

                                                            <ListItemButton component="a" >
                                                                <ListItemText primary="Eliminar" />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    </List>
                                                </Popover>

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
            </div>
        </Layout >
    )
}