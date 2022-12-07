// import {
//     Scheduler,
//     MonthView,
//     Appointments,
//     AppointmentForm,
//     AppointmentTooltip
// } from '@devexpress/dx-react-scheduler-material-ui';
// import { ViewState, EditingState, IntegratedEditing, Scheduler, MonthView, AppointmentForm } from '@devexpress/dx-react-scheduler';
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
    const [usuario, setUsuario] = useState([])
    useEffect(() => {
        traerUsuario()
 
    }, [usuario.id])

    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario({ id: res.data?.id })
        }
    }


    return (
        <div id="calendar">
            {
                usuario?.rol?.id === 3 || usuario?.rol?.id === 8 || (
                    <Scheduler
                        firstDayOfWeek={1}
                        locale={'es-AR'}
                        dataSource={data}
                        defaultCurrentDate={new Date()}
                        defaultCurrentView={'week'}
                    onAppointmentFormOpening={onFormOpening}
                    onAppointmentAdded={(e) => onAdd(e.appointmentData)}
                    onAppointmentUpdated={(e) => onUpdate(e.appointmentData)}
                    onAppointmentDeleted={(e) => onDelete(e.appointmentData)}
                    >

                        <Editing
                        allowAdding={false}
                        allowDeleting={false}
                        allowUpdating={false} />
                    </Scheduler>

                )
            }
            {
                usuario?.rol?.id === 4 || usuario?.rol?.id === 1 || (
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
                            allowAdding={true}
                            allowDeleting={true}
                            allowUpdating={true} />
                    </Scheduler>

                )
            }
        </div>
    )
}