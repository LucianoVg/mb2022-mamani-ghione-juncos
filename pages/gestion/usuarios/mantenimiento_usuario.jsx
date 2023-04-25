
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
    let queryParams = []
    const pageSize = 5
    const cantidadPaginas = Math.ceil(usuarios?.length / pageSize)
    const paginacion = usePagination(usuarios, pageSize)
    const [pagina, setPagina] = useState(1)
    const [cargandoInfo, setCargandoInfo] = useState(false)
    const [usuario, setUsuario] = useState({ id: 0, rol: '' })
    const [rol, setRol] = useState(0)
    const [roles, setRoles] = useState([])
    const [idSelectedUser, setIdSelectedUser] = useState(0)

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
            || usuario.rol === 'Secretaria'
            || usuario.rol === 'Vicedirector'
            || usuario.rol === 'Director'
    }
    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
        }
    }
    const traerUsuarios = async () => {
        queryParams.push({ idLogged: usuario.id, rol: usuario.rol })
        if (idUsuario) {
            queryParams.push({ idUsuario })
        }
        if (rol) {
            queryParams.push({ idRol: rol })
        }
        let params = ""
        queryParams.forEach(qp => {
            for (const key in qp) {
                params += `${key}=${qp[key]}&`
            }
        })
        console.log(params);
        setCargandoInfo(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/usuarios?${params}`)
        if (res.data) {
            setUsuarios(res.data)
            queryParams = []
            setRol(0)
        }
        setCargandoInfo(false)
    }
    const traerRoles = async () => {
        let param = `?rol=${usuario.rol}`
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/roles${param}`)
        if (res.status === 200) {
            console.log(res.data);
            setRoles(res.data)
        }
    }
    const handleRol = (e) => {
        setRol(e.target.value)
    }

    const [idUsuario, setIdUsuario] = useState(0)

    const handleUsuario = (e, newValue) => {
        if (newValue) {
            setIdUsuario(newValue.id);
        } else {
            setIdUsuario(0)
        }
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e, id) => {
        setAnchorEl(e.currentTarget);
        if (!localStorage.getItem('vistas')) {
            localStorage.setItem('vistas', true)
        }
        setIdSelectedUser(id)
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
                    (usuario.rol === 'Director' || usuario.rol === 'Administrador' || usuario.rol === 'Vicedirector') && (
                        <Link href={'/gestion/usuarios/nuevo'}>
                            <Button variant="contained">Nuevo Usuario</Button>
                        </Link>
                    )
                }
                {
                    usuario.rol === 'Secretaria' && (
                        <Link href={'/gestion/usuarios/nuevo'}>
                            <Button variant="contained">Nuevo Estudiante</Button>
                        </Link>
                    )
                }
                <Typography variant="h4" sx={{ textAlign: 'center', m: 2 }}>Usuarios del Sistema</Typography>
                <Box direction='row' sx={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
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
                    {
                        usuario.rol !== "Secretaria" && (
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
                        )
                    }
                    <Button
                        sx={{ mx: 3 }}
                        onClick={traerUsuarios}
                        variant="outlined"
                        startIcon={<Search />}>
                        Buscar
                    </Button>
                </Box>

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
                                    {paginacion.dataActual()?.map((u, i) => (
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
                                                <IconButton onClick={(e) => handleClick(e, u.id)}>
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
                                                            <ListItemButton component="a" href={`/gestion/usuarios/${idSelectedUser}`} >
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