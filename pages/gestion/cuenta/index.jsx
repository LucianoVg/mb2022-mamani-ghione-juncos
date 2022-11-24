import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import { useRouter } from "next/router";

export default function Detalles() {
    const { loading, authUser } = useAuth()
    const router = useRouter()
    const [usuario, setUsuario] = useState()
    const [enfermedades, setEnfermedades] = useState()
    const [selectedEnf, setSelectedEnf] = useState([])
    const [alergias, setAlergias] = useState('')

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        traerEnfermedades()
    }, [loading, authUser])

    const handleEnfermedad = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedEnf(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario(res.data)
        }
    }
    const traerEnfermedades = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/enfermedades`)
        if (res.data) {
            setEnfermedades(res.data)
        }
    }
    return (
        <Layout>
            <div>
                <h4 className="text-center">Datos Personales</h4>

                <div className="row">
                    <div className="col">
                        <h5>
                            <strong>Nombre</strong> <br />
                            {usuario?.nombre}
                        </h5>
                    </div>
                    <div className="col">
                        <h5>
                            <strong>Apellido</strong> <br />
                            {usuario?.apellido}
                        </h5>
                    </div>
                    <div className="col">
                        <h5>
                            <strong>Legajo</strong> <br />
                            {usuario?.legajo}
                        </h5>
                    </div>
                    <div className="col">
                        <h5>
                            <strong>Mail</strong> <br />
                            {usuario?.correo}
                        </h5>
                    </div>
                    <div className="col">
                        <h5>
                            <strong>Direccion</strong> <br />
                            {usuario?.direccion}
                        </h5>
                    </div>
                    <div className="col">
                        <h5>
                            <strong>Telefono</strong> <br />
                            {usuario?.telefono}
                        </h5>
                    </div>
                    <div className="col">
                        <h5>
                            <strong>Edad</strong> <br />
                            {usuario?.fechaNacimiento ? (new Date().getFullYear() - new Date(usuario?.fechaNacimiento).getFullYear()) : 'N/A'}
                        </h5>
                    </div>
                    <div className="col">
                        <h5>
                            <strong>Fecha de Nacimiento</strong> <br />
                            {usuario?.fechaNacimiento || 'N/A'}
                        </h5>
                    </div>
                    <div className="col">
                        <h5>
                            <strong>Curso</strong> <br />
                            {usuario?.alumnoXcursoXdivision[0]?.cursoXdivision?.curso?.nombre
                                && usuario?.alumnoXcursoXdivision[0]?.cursoXdivision?.division?.division ? `${usuario?.alumnoXcursoXdivision[0]?.cursoXdivision?.curso?.nombre}
                                "${usuario?.alumnoXcursoXdivision[0]?.cursoXdivision?.division?.division}"` : 'N/A'}
                        </h5>
                    </div>
                </div>

                {
                    usuario?.rol?.tipo === 'Estudiante' && (
                        <>
                            <hr />

                            <h4>Datos de salud</h4>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="demo-multiple-name">
                                            Tenés alguna Enfermedad?
                                        </label>
                                        <select
                                            className="form-control"
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            multiple
                                            value={selectedEnf}
                                            onChange={handleEnfermedad}
                                        >
                                            {enfermedades?.map((enf) => (
                                                <option
                                                    key={enf.id}
                                                    value={enf.descripcion}>
                                                    {enf.descripcion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Tiene alguna alergia?" multiline value={alergias} onChange={(e) => { setAlergias(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

                <hr />

                {
                    usuario?.rol?.tipo === 'Estudiante' && (
                        <>
                            <h4>Datos del Tutor</h4>
                            <div className="row">
                                <div className="col">
                                    <strong>Nombre</strong> <br />
                                    {usuario?.tutor?.nombre}
                                </div>
                                <div className="col">
                                    <strong>Apellido</strong> <br />
                                    {usuario?.tutor?.apellido}
                                </div>
                                <div className="col">
                                    <strong>Dni</strong> <br />
                                    {usuario?.tutor?.legajo}
                                </div>
                                <div className="col">
                                    <strong>Mail</strong> <br />
                                    {usuario?.tutor?.correo}
                                </div>
                                <div className="col">
                                    <strong>Telefono</strong> <br />
                                    {usuario?.tutor?.telefono}
                                </div>
                            </div>

                            <hr />

                            <h4>Datos de Matriculacion</h4>
                            <div className="row">
                                <div className="col">
                                    <strong>Año de Matriculacion</strong> <br />
                                    {usuario?.alumnoXcursoXdivision[0]?.anoActual}
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </Layout >
    )
}