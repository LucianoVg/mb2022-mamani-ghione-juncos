import {
    Scheduler,
    MonthView,
    Appointments,
    AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';

let dia = 0
const schedulerData = [
    {
        startDate: new Date(2022, 9, ++dia, 6, 0, 0),
        endDate: new Date(2022, 9, ++dia, 7, 0, 0),
        title: 'Meeting'
    },
    {
        startDate: new Date(2022, 9, ++dia, 7, 0, 0),
        endDate: new Date(2022, 9, ++dia, 7, 0, 0),
        title: 'Go to a gym'
    },
];
export default function Calendar({ data, onDataChange }) {

    return (
        <div id="calendar">
            <Scheduler firstDayOfWeek={1} locale={'es-AR'} data={data && data?.length || schedulerData}>
                <ViewState currentDate={new Date().toISOString()} />
                <EditingState onCommitChanges={onDataChange} />
                <IntegratedEditing />
                <MonthView />
                <Appointments />
                <AppointmentForm />
            </Scheduler>
        </div>
    )
}