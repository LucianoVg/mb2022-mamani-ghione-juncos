
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function MantenimientoUsuario() {
    const [usuarios, setUsuarios] = useState([])
    const router = useRouter()
    const { loading, authUser } = useAuth()

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuarios()
    }, [authUser, loading])

    const traerUsuarios = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/usuarios`)
        if (res.data) {
            setUsuarios(res.data)
        }
    }
    const usuariosOptions = usuarios.map((usuario, i) => ({
        id: usuario.id,
        label: usuario.nombre + ' ' + usuario.apellido
    }))

    const defaultOptions = {
        options: usuariosOptions,
        getOptionLabel: (option) => option.label,
    }

    const [value, setValue] = useState(null)
    const handleValue = (e, newValue) => {
        setValue(newValue)
        if (newValue) {
            setUsuarios((usuarios) => usuarios.filter(u => u.id === newValue?.id))
        } else {
            traerUsuarios()
        }
    };

    return (
        <Layout title={'Mantenimiento de Usuarios'}>
            <Link href={'/gestion/usuarios/nuevo'}>
                <Button variant="outlined">Nuevo Usuario</Button>
            </Link>
            <Typography variant="h4" sx={{ textAlign: 'center', m: 2 }}>Usuarios del Sistema</Typography>

            <Autocomplete
                sx={{ width: '200px' }}
                {...defaultOptions}
                freeSolo
                // isOptionEqualToValue={(option, value) => option.id === value.id}
                multiple={false}
                id="controlled-demo"
                value={value}
                onChange={handleValue}

                renderInput={(params) => <TextField {...params} label="Usuarios" variant="outlined" />}

            />



            <TableContainer sx={{ marginTop: '20px' }} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Legajo</TableCell>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Apellido</TableCell>
                            <TableCell align="right">Direccion</TableCell>
                            <TableCell align="right">Telefono</TableCell>
                            <TableCell align="right">Localidad</TableCell>
                            <TableCell align="right">Rol</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usuarios.map((u, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">{u.legajo}</TableCell>
                                <TableCell align="right">{u.nombre}</TableCell>
                                <TableCell align="right">{u.apellido}</TableCell>
                                <TableCell align="right">{u.direccion}</TableCell>
                                <TableCell align="right">{u.telefono}</TableCell>
                                <TableCell align="right">{u.localidad}</TableCell>
                                <TableCell align="right">{u.rol?.tipo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    )
}