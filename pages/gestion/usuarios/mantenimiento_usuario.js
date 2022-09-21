
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
    const [options, setOptions] = useState([])

    const defaultOptions = {
        options: options,
        getOptionLabel: (option) => option?.nombre
    }

    const [value, setValue] = useState({
        id: options[0]?.id,
        nombre: options[0]?.nombre
    })

    const handleValue = (e, value, reason) => {
        if (reason === 'selectOption') {
            setValue(value)
        } else if (reason === 'clear') {
            setValue({ id: '', label: '' })
        }
    };
    console.log(value)


    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/usuarios`)
            .then(res => {
                setUsuarios(res.data)
            })
        setOptions(usuarios.map(u => ({ id: u?.id, nombre: u?.nombre })))
    }, [authUser, loading])

    return (
        <Layout title={'Mantenimiento de Usuarios'}>
            <Link href={'/gestion/usuarios/nuevo'}>
                <Button variant="outlined">Nuevo Usuario</Button>
            </Link>
            <Typography variant="h4" sx={{ textAlign: 'center', m: 2 }}>Usuarios del Sistema</Typography>

            <Autocomplete
                {...defaultOptions}
                multiple={false}
                id="autocomplete-usuario"
                value={value}
                onChange={(e, newValue) => setValue(newValue)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Usuarios" variant="outlined" />}
            />

            <TableContainer sx={{ marginTop: '20px' }} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>DNI</TableCell>
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
                                <TableCell component="th" scope="row">{u.dni}</TableCell>
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