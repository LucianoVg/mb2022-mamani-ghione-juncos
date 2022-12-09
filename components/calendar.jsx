import Scheduler, { Editing } from 'devextreme-react/scheduler'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from './context/authUserProvider';

export default function Calendar({ data, onAdd, onUpdate, onDelete }) {
    const onFormOpening = (e) => {
        e.popup.option('showTitle', true);
        e.popup.option('title', e.appointmentData.text ?
            e.appointmentData.text :
            'Nueva Fecha de Examen');

        const form = e.form;
        let mainGroupItems = form.itemOption('mainGroup').items;
        mainGroupItems = mainGroupItems.splice(0, 2)
        form.itemOption('mainGroup', 'items', mainGroupItems);
    }
    const { loading, authUser } = useAuth()
    const [usuario, setUsuario] = useState({ id: 0, rol: '' })
    useEffect(() => {
        traerUsuario()
    }, [usuario.id, usuario.rol])

    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
        }
    }
    const tienePermisos = () => {
        return usuario.rol === 'Administrador'
            || usuario.rol === 'Docente'
    }

    return (
        <div id="calendar">
            <Scheduler
                firstDayOfWeek={1}
                locale={'es-AR'}
                dataSource={data}
                defaultCurrentDate={new Date()}
                defaultCurrentView={'week'}
                onAppointmentFormOpening={onFormOpening}
                onAppointmentAdded={(e) => onAdd(e.appointmentData)}
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