import Scheduler, { Editing } from 'devextreme-react/scheduler'

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
                    allowAdding={true}
                    allowDeleting={true}
                    allowUpdating={true} />
            </Scheduler>
        </div>
    )
}