import { useState } from "react";
import { Layout } from "../../../components/layout";

export default function Detalles() {
    const [discapacidad, setDiscapacidad] = useState({
        list: []
    })
    const handleDiscapacidad = e => {
        setDiscapacidad(discapacidad => ({
            ...discapacidad,
            [e.target.name]:
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value
        }));
    };

    console.log(discapacidad)




    const [enfermedad, setEnfermedad] = useState({
        list: []
    });
    const handleEnfermedad = e => {

        setEnfermedad(enfermedad => ({
            ...enfermedad,
            [e.target.name]:
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value
        }));
    };
    console.log(enfermedad)


    const [checked, setChecked] = useState(false);
    console.log(checked)
    const handleCheck = (e) => {
        setChecked(e.target.checked);
    };
    const [checked1, setChecked1] = useState(false);
    const handleCheck1 = (e) => {
        setChecked1(e.target.checked);
    };
    const [checked2, setChecked2] = useState(false);
    const handleCheck2 = (e) => {
        setChecked2(e.target.checked);
    };
    const [checked3, setChecked3] = useState(false);
    const handleCheck3 = (e) => {
        setChecked3(e.target.checked);
    };

    const [checked4, setChecked4] = useState(false);
    const handleCheck4 = (e) => {
        setChecked4(e.target.checked);
    };

    const [docente, setDocente] = useState(false);
    const handleDocente = (e) => {
        setDocente(e.target.checked);
    };


    return (
        <Layout>
            <div>
                <h4>Datos Personales</h4>

                <div className="row">
                    <div className="col-md-2">
                        <h5 className="mb-2">
                            <strong>Nombre</strong> <br />
                            Nico
                        </h5>
                    </div>
                    <div className="col-md-2">
                        <h5 className="mb-2">
                            <strong>Apellido</strong> <br />
                            Juncos
                        </h5>
                    </div>
                    <div className="col-md-2">
                        <h5 className="mb-2">
                            <strong>Dni</strong> <br />
                            345642
                        </h5>
                    </div>
                    <div >
                        <h5 className="mb-2"> <strong>Mail</strong> <br />
                            nico@gmail.com</h5>
                    </div>
                    <div className="col-md-2">
                        <h5 className="mb-2">
                            <strong>Direccion</strong> <br />
                            Siempre Viva3 56
                        </h5>
                    </div>
                    <div className="col-md-2">
                        <h5 className="mb-2">
                            <strong>Telefono</strong> <br />
                            351-442321
                        </h5>
                    </div>
                    <div className="col-md-2">
                        <h5 className="mb-2">
                            <strong>Edad</strong> <br />
                            54
                        </h5>
                    </div>
                    <div className="col-md-2">
                        <h5>
                            <strong>Fecha de Nacimiento</strong> <br />
                            20/05/1975
                        </h5>
                    </div>
                </div>
                <h5 >
                    Docente?
                    <input
                        type={'checkbox'}
                        checked={docente}
                        onChange={handleDocente}
                    />
                </h5>

                {
                    docente && (
                        <div className="row">
                            <div className="col-md-6">
                                <h5>
                                    <strong>Curso/s</strong> <br />
                                    *4 &quot;A&quot; <br />
                                    *2 &quot;A&quot;<br />
                                </h5>
                            </div>
                            <div className="col-md-6">
                                <h5>
                                    <strong>Materia/s</strong> <br />
                                    *Lengua <br />
                                    *Ingles <br />
                                </h5>
                            </div>
                        </div>
                    )
                }
                <hr className="mb-2" />

                <h4 className="mb-2">
                    Datos de salud
                </h4>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-check">
                            <label className="form-check-label">
                                Tiene alguna discapacidad?
                            </label>
                            <input
                                className="form-check-input"
                                type={'checkbox'}
                                checked={checked}
                                onChange={handleCheck}
                            />
                        </div>
                        {
                            checked && (
                                <div className="form-group">
                                    <select
                                        className="form-select"
                                        name="list"
                                        id="list">
                                        <option value="Autismo">
                                            Autismo
                                        </option>
                                        <option value="Deficiencia auditiva">
                                            Deficiencia auditiva
                                        </option>
                                        <option value="Dificultades en el aprendizaje" >
                                            Dificultades en el aprendizaje
                                        </option>
                                    </select>
                                </div>
                            )
                        }
                    </div>
                    <div className="col-md-4">
                        <div className="form-check">
                            <label className="form-check-label">
                                Tiene alguna enfermedad?
                            </label>
                            <input
                                className="form-check-input"
                                type={'checkbox'}
                                checked={checked1}
                                onChange={handleCheck1}
                            />
                        </div>
                        {
                            checked1 && (
                                <div className="form-group">
                                    <select
                                        className="form-select"
                                        style={{ maxWidth: '300px' }}
                                        name="list"
                                        id="list"
                                    >
                                        <option value="admin">
                                            Asma
                                        </option>
                                        <option value="user1">
                                            Diabetes
                                        </option>
                                        <option value="user2" >
                                            Artritis
                                        </option>
                                    </select>
                                </div>
                            )
                        }
                    </div>
                    <div className="col-md-4">
                        <div className="form-check">
                            <label className="form-check-label">
                                Tiene alguna alergia?
                            </label>
                            <input
                                className="form-check-input"
                                type={'checkbox'}
                                checked={checked2}
                                onChange={handleCheck2}
                            />
                        </div>
                        {
                            checked2 && (
                                <textarea
                                    className="form-control"></textarea>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}