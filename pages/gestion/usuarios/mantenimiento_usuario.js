
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";


export default function MantenimientoUsuario() {
    const [usuarios, setUsuarios] = useState([])
    const router = useRouter()
    const { loading, authUser } = useAuth()

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/usuarios`)
            .then(res => {
                setUsuarios(res.data)
            })
    }, [authUser, loading])

    return (
        <Layout title={'Mantenimiento de Usuarios'}>
            <Link href={'/gestion/usuarios/nuevo'}>
                <Button variant="outlined">Nuevo Usuario</Button>
            </Link>
            <Typography variant="h4" sx={{ textAlign: 'center', m: 2 }}>Usuarios del Sistema</Typography>

            <TableContainer component={Paper}>
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