import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
// import styles from "../../../styles/notas.module.css";
import { Box, Button, Container, Grid, InputLabel, MenuItem, Paper, ListSubheader, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography, FormControl, Pagination } from "@mui/material";
import { useAuth } from "../../../components/context/authUserProvider";
import { useRouter } from "next/router";
import { SearchOutlined } from "@mui/icons-material";
import Loading from '../../../components/loading';
import { usePagination } from "../../../components/hooks/paginationHook";

export default function Notas() {
    const [notas, setNotas] = useState([])

    const [index, setIndex] = useState(0)
    // const [trimestres, setTrimestres] = useState([])
    // const [idTrimestre, setIdTrimestre] = useState("")
    const [idMateria, setIdMateria] = useState(0)
    const [idCurso, setIdCurso] = useState(0)
    const [nombreAlumno, setNombreAlumno] = useState("")
    const [apellidoAlumno, setApellidoAlumno] = useState("")

    const [nota, setNota] = useState(1);
    const [columnName, setColumnName] = useState("");
    const [cursos, setCursos] = useState([])
    const [materias, setMaterias] = useState([])
    const { loading, authUser } = useAuth()
    const router = useRouter()
    const [cargandoInfo, setCargandoInfo] = useState(false)

    const pageSize = 5
    const cantidadPaginas = Math.ceil(notas?.length / pageSize)
    const paginacion = usePagination(notas || [], pageSize)
    const [pagina, setPagina] = useState(1)
    const [trimestres, setTrimestres] = useState([])
    let queryParams = []

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const handlerCambioPagina = (e, pagina) => {
        setPagina(pagina)
        paginacion.saltar(pagina)
    }
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
    }, [loading, authUser])

    useEffect(() => {
        traerCursos()
    }, [])
    useEffect(() => {
        traerMaterias()
    }, [])
    useEffect(() => {
        traerTrimestres()
    }, [])
    useEffect(() => {
        traerNotas()
    }, [])

    const handleTrimestre = (e, value) => {
        console.log(value);
        setIndex(value)
        traerNotas(Number(value))
    }

    const handleMateria = (e) => {
        setIdMateria(Number(e.target.value))
    }

    const handleCurso = (e) => {
        setIdCurso(Number(e.target.value))
    }
    const handleNombreAlumno = (e) => {
        setNombreAlumno(e.target.value)
    }

    const handleApellidoAlumno = (e) => {
        setApellidoAlumno(e.target.value)
    }

    const traerCursos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
        if (res.data) {
            setCursos(res.data)
        }
    }
    const traerMaterias = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias/`)
        if (res.data) {
            setMaterias(res.data)
        }
    }
    const traerTrimestres = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/trimestres`)
        if (res.data) {
            setTrimestres(() => res.data)
        }
    }

    const traerNotas = async (value = 0) => {
        if (nombreAlumno) {
            queryParams.push({ nombreAlumno })
        }
        if (apellidoAlumno) {
            queryParams.push({ apellidoAlumno })
        }
        if (idMateria) {
            queryParams.push({ idMateria })
        }
        if (idCurso) {
            queryParams.push({ idCurso })
        }
        let params = ''
        queryParams.forEach(qp => {
            for (const key in qp) {
                params += `${key}=${qp[key]}&`
            }
        })
        // params += `idTrimestre=${value}`
        setCargandoInfo(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notas?${params}`)
        if (res.data) {
            setNotas(res.data.filter(n => n.idTrimestre === (value + 1)))
        }
        setCargandoInfo(false)
    }

    // const onEdit = (id) => {
    //     setInEditMode({
    //         status: true,
    //         rowKey: id
    //     })
    // }

    const updateNota = (id, newNota, columnName) => {
        axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notas/update/${id}`, {
            nota: newNota,
            nombreColumna: columnName
        })
            .then(res => {
                console.log(res.data);
                // reset inEditMode and unit price state values
                onCancel();

                // fetch the updated data
                traerNotas(index)
            }).catch(err => {
                console.error(err);
            })
    }

    const onSave = (id, newNota, columnName) => {
        updateNota(id, newNota, columnName);
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setNota(0);
    }

    const onChangeNotaColumna = (e) => {
        setNota(Number.parseInt(e.target.value))
        setColumnName(e.target.name)
    }


    return (
        <Layout>
            <Container maxWidth={'xl'}>
                <Typography variant="h4">Notas</Typography>
                <Box sx={{ marginTop: '20px' }} >
                    <Box direction='row'>
                        <FormControl>
                            <InputLabel htmlFor="inputMateria">Materia</InputLabel>
                            <Select id="inputMateria"
                                onChange={handleMateria}
                                name="idMateria"
                                value={idMateria}
                                label="Materia"
                                sx={{ width: '150px', marginRight: '20px', marginBottom: '20px' }}>
                                <ListSubheader>Primero</ListSubheader>
                                {

                                    materias && materias?.map((m, i) => (

                                        m?.idCurso === 1 && (

                                            <MenuItem selected={i === 0} key={i} value={m.id}>{m.nombre}</MenuItem>
                                        )

                                    ))
                                }
                                <ListSubheader>Segundo</ListSubheader>
                                {

                                    materias && materias?.map((m, i) => (

                                        m?.idCurso === 2 && (

                                            <MenuItem selected={i === 0} key={i} value={m.id}>{m.nombre}</MenuItem>
                                        )

                                    ))
                                }
                                <ListSubheader>Tercero</ListSubheader>
                                {

                                    materias && materias?.map((m, i) => (

                                        m?.idcurso === 3 && (

                                            <MenuItem selected={i === 0} key={i} value={m.id}>{m.nombre}</MenuItem>
                                        )

                                    ))
                                }
                                <ListSubheader>Cuarto</ListSubheader>
                                {

                                    materias && materias?.map((m, i) => (

                                        m?.idCurso === 4 && (

                                            <MenuItem selected={i === 0} key={i} value={m.id}>{m.nombre}</MenuItem>
                                        )

                                    ))
                                }
                                <ListSubheader>Quinto</ListSubheader>
                                {

                                    materias && materias?.map((m, i) => (

                                        m?.idCurso === 5 && (

                                            <MenuItem selected={i === 0} key={i} value={m.id}>{m.nombre}</MenuItem>
                                        )

                                    ))
                                }
                                <ListSubheader>Sexto</ListSubheader>
                                {

                                    materias && materias?.map((m, i) => (

                                        m?.idCurso === 6 && (

                                            <MenuItem selected={i === 0} key={i} value={m.id}>{m.nombre}</MenuItem>
                                        )

                                    ))
                                }
                            </Select>

                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="inputCurso">Curso</InputLabel>
                            <Select id="inputCurso"
                                name="idCurso"
                                value={idCurso}
                                onChange={handleCurso}
                                label="Curso"
                                sx={{ width: '90px', marginRight: '20px', marginBottom: '20px' }}>
                                {
                                    cursos && cursos?.map((c, i) => (

                                        <MenuItem selected={i === 0} key={i} value={c.id}>{c.curso?.nombre} {c.division?.division}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>


                    <Box direction='row'>
                        <TextField margin="normal"
                            name="nombreAlumno"
                            value={nombreAlumno}
                            onChange={handleNombreAlumno}
                            label="Nombre del alumno"
                            sx={{ marginRight: '20px', marginBottom: '20px' }}
                        />
                        <TextField margin="normal"
                            name="apellidoAlumno"
                            value={apellidoAlumno}
                            onChange={handleApellidoAlumno}
                            label="Apellido del alumno" />

                        <Button endIcon={<SearchOutlined />}
                            sx={{ mt: 3, ml: 2 }}
                            color="info"
                            variant="outlined"
                            onClick={traerNotas}>
                            Buscar
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={index} onChange={handleTrimestre}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                    >
                        {
                            trimestres?.map(t => (
                                <Tab label={t.trimestre} tabIndex={t.id} />
                            ))
                        }
                        {/* <Tab label="Segundo Trimestre" />
                        <Tab label="Tercer Trimestre" /> */}
                    </Tabs>
                </Box>
                {
                    cargandoInfo && (
                        <Container sx={{ textAlign: 'center' }}>
                            <Loading size={80} />
                        </Container>
                    )
                }
                {
                    !cargandoInfo && (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 800 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Legajo</TableCell>
                                        <TableCell align="right">Sexo</TableCell>
                                        <TableCell align="right">Nombre</TableCell>
                                        <TableCell align="right">Apellido</TableCell>
                                        <TableCell align="right">Materia</TableCell>
                                        <TableCell align="right">Nota 1</TableCell>
                                        <TableCell align="right">Nota 2</TableCell>
                                        <TableCell align="right">Nota 3</TableCell>
                                        <TableCell align="right">Nota 4</TableCell>
                                        <TableCell align="right">Nota 5</TableCell>
                                        <TableCell align="right">Trimestre</TableCell>
                                        <TableCell align="right">Operacion</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        notas && paginacion.dataActual()?.map((n, i) => (
                                            <TableRow key={i}>
                                                <TableCell align="left">
                                                    {n.alumnoXcursoXdivision?.usuario?.legajo}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {n.alumnoXcursoXdivision?.usuario?.sexo}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {n.alumnoXcursoXdivision?.usuario?.nombre}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {n.alumnoXcursoXdivision?.usuario?.apellido}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {n.materia?.nombre}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (
                                                            <TextField type="number"
                                                                margin="normal"
                                                                variant="standard"
                                                                name="nota1"
                                                                placeholder={n.nota1}
                                                                onChange={onChangeNotaColumna}

                                                            />
                                                        ) :
                                                            (
                                                                n.nota1
                                                            )
                                                    }
                                                </TableCell>
                                                <TableCell align="right">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (
                                                            <TextField type="number"
                                                                name="nota2"
                                                                variant="standard"
                                                                placeholder={n.nota2}
                                                                onChange={onChangeNotaColumna}

                                                            />
                                                        ) :
                                                            (
                                                                n.nota2
                                                            )
                                                    }
                                                </TableCell>
                                                <TableCell align="right">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (
                                                            <TextField type="number"
                                                                name="nota3"
                                                                variant="standard"
                                                                placeholder={n.nota3}
                                                                onChange={onChangeNotaColumna}

                                                            />
                                                        ) :
                                                            (
                                                                n.nota3
                                                            )
                                                    }
                                                </TableCell>
                                                <TableCell align="right">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (
                                                            <TextField type="number"
                                                                name="nota4"
                                                                variant="standard"
                                                                placeholder={n.nota4}
                                                                onChange={onChangeNotaColumna}

                                                            />
                                                        ) :
                                                            (
                                                                n.nota4
                                                            )
                                                    }
                                                </TableCell>
                                                <TableCell align="right">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (
                                                            <TextField type="number"
                                                                name="nota5"
                                                                variant="standard"
                                                                placeholder={n.nota5}
                                                                onChange={onChangeNotaColumna}

                                                            />
                                                        ) :
                                                            (
                                                                n.nota5
                                                            )
                                                    }
                                                </TableCell>
                                                <TableCell align="right">
                                                    {n.trimestre?.trimestre}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (

                                                            <React.Fragment>
                                                                <Grid container spacing={11}>
                                                                    <Grid item xs={5} >
                                                                        <Button variant="contained"
                                                                            color="primary"
                                                                            size="small"
                                                                            onClick={() => onSave(n.id, nota, columnName)}
                                                                        >
                                                                            Guardar
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item xs={5}>
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="secondary"
                                                                            size="small"
                                                                            onClick={() => onCancel()}
                                                                        >
                                                                            Cancelar
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </React.Fragment>
                                                        ) : (
                                                            <Button
                                                                variant="contained"
                                                                color="info"
                                                                size="small"
                                                                onClick={() => setInEditMode({
                                                                    status: true,
                                                                    rowKey: i
                                                                })}
                                                            >
                                                                Editar
                                                            </Button>
                                                        )
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                }
                {
                    !cargandoInfo && notas.length > 0 && (
                        <Container maxWidth={'lg'} sx={{ marginTop: 3 }}>
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
            </Container>
        </Layout >

    );

}