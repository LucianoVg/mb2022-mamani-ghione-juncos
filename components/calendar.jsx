import Scheduler, { Editing } from 'devextreme-react/scheduler'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from './context/authUserProvider';
import 'dayjs/locale/es-mx';

export default function Calendar({ data, onAdd, onUpdate, onDelete }) {
    const onFormOpening = (e) => {
        const { form } = e
        form.option('items', [
            {
                label: {
                    text: 'Curso'
                },
                editorType: 'dxSelectBox',
                dataField: 'id',
                editorOptions: {
                    items: cursos,
                    displayExpr: 'curso',
                    valueExpr: 'id',
                    value: idCurso,
                    readonly: !tienePermisos(),
                    onValueChanged(args) {
                        setIdCurso(Number(args.value))
                    }
                }
            },
            {
                label: {
                    text: 'Asunto'
                },
                editorType: 'dxTextBox',
                dataField: 'asunto',
                editorOptions: {
                    value: asunto,
                    readonly: !tienePermisos(),
                    onValueChanged(args) {
                        setAsunto(args.value)
                    }
                }
            },
            {
                label: {
                    text: 'Fecha Inicio'
                },
                editorType: 'dxDateBox',
                dataField: 'fechaInicio',
                editorOptions: {
                    value: fechaInicio,
                    type: 'datetime',
                    readonly: !tienePermisos(),
                    onValueChanged(args) {
                        setFechaInicio(args.value)
                    }
                }
            },
            {
                label: {
                    text: 'Fecha Fin'
                },
                editorType: 'dxDateBox',
                dataField: 'fechaFin',
                editorOptions: {
                    value: fechaFin,
                    type: 'datetime',
                    readonly: !tienePermisos(),
                    onValueChanged(args) {
                        setFechaFin(args.value)
                    }
                }
            }
        ])
    }
    const { authUser } = useAuth()
    const [usuario, setUsuario] = useState({ id: 0, rol: '' })
    const [cursos, setCursos] = useState([])
    const [asunto, setAsunto] = useState('')
    const [fechaInicio, setFechaInicio] = useState(new Date())
    const [fechaFin, setFechaFin] = useState(new Date())
    const [idCurso, setIdCurso] = useState(0)

    useEffect(() => {
        // traerUsuario()
        traerCursos()
    }, [authUser?.id, authUser?.rol?.tipo, authUser])

    const traerCursos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
        if (res.data) {
            setCursos(res.data?.map(c => ({ id: c?.id, curso: `${c?.curso?.nombre} ${c?.division?.division}` })))
        }
    }
    // const traerUsuario = async () => {
    //     const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
    //     if (res.data) {
    //         setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
    //     }
    // }
    const tienePermisos = () => {
        return authUser?.rol?.tipo === 'Administrador'
            || authUser?.rol?.tipo === 'Docente'
    }

    return (
        <div id="calendar"   >
            <Scheduler
                
                firstDayOfWeek={1}
                locale={'es-AR'}
                dataSource={data}
                defaultCurrentDate={new Date()}
                currentView="week"
                views={['week']}
                onAppointmentClick={(e) => {
                    console.log(e.appointmentData)
                    setIdCurso(e.appointmentData.idCurso)
                    setAsunto(e.appointmentData.text)
                    setFechaInicio(e.appointmentData.startDate)
                    setFechaFin(e.appointmentData.endDate)
                }}
                onAppointmentFormOpening={(e) => {
                    e.popup.focus()
                    onFormOpening(e)
                }}
                onAppointmentAdded={(e) => onAdd(idCurso, asunto, fechaInicio, fechaFin)}
                onAppointmentUpdated={(e) => onUpdate(e.appointmentData)}
                onAppointmentDeleted={(e) => onDelete(e.appointmentData)}>

                <Editing
                    allowAdding={tienePermisos()}
                    allowDeleting={tienePermisos()}
                    allowUpdating={tienePermisos()} />
            </Scheduler>
        </div>
    )
}