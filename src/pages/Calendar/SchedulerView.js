import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { CalendarApi } from '~/services/api';
import {
    Scheduler,
    MonthView,
    WeekView,
    DayView,
    Appointments,
    AllDayPanel,
    Toolbar,
    DateNavigator,
    ViewSwitcher,
    AppointmentForm,
    AppointmentTooltip,
    TodayButton,
    ConfirmationDialog,
    CurrentTimeIndicator,
    DragDropProvider,
    EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';

function SchedulerView(props) {
    const { onCurrentDateChange } = props;
    const [data, setData] = useState([]);
    const [currentViewName, setCurrentViewName] = useState('Month');

    const onCommitChanges = ({ added, changed, deleted }) => {
        let appointments = data;
        if (added) {
            const startingAddedId = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 0;
            appointments = [...appointments, { id: startingAddedId, ...added }];
        }
        if (changed) {
            appointments = appointments.map((appointment) => {
                if (changed[appointment.id]) {
                    CalendarApi().updateEvent({ eventId: appointment.id, ...changed[appointment.id] });
                    return { ...appointment, ...changed[appointment.id] };
                }
            });
        }
        if (deleted !== undefined) {
            CalendarApi().deleteEvent({ eventId: deleted });
        }

        setData(appointments);
    };

    useEffect(() => {
        let payload = {
            params: {
                all_events: '1',
            },
        };

        CalendarApi()
            .getAllEvents(payload)
            .then((res) => {
                let events = [];
                res.forEach((event) => {
                    events.push({
                        id: event.id,
                        title: event.title,
                        startDate: event.start_at,
                        endDate: event.end_at,
                        notes: event.notes,
                        location: event.location,
                        userId: event.user_id,
                        createdAt: event.created_at,
                        updatedAt: event.updated_at,
                    });
                    setData(events);
                });
            });
    }, [data]);

    return (
        <Scheduler data={data}>
            <ViewState
                currentViewName={currentViewName}
                onCurrentViewNameChange={setCurrentViewName}
                onCurrentDateChange={onCurrentDateChange}
            />
            <EditingState onCommitChanges={onCommitChanges} />
            <EditRecurrenceMenu />
            <ConfirmationDialog />
            <DayView startDayHour={0.0} endDayHour={24.0} cellDuration={60} />
            <WeekView startDayHour={0.0} endDayHour={24.0} cellDuration={60} />
            <MonthView startDayHour={0.0} endDayHour={24.0} />
            <Appointments />
            <AllDayPanel />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
            <DragDropProvider />
            <CurrentTimeIndicator shadePreviousCells={true} shadePreviousAppointments={true} updateInterval={10000} />
            <AppointmentForm />
        </Scheduler>
    );
}

SchedulerView.propTypes = {
    data: PropTypes.array.isRequired,
    onCurrentDateChange: PropTypes.func.isRequired,
    onCommitChanges: PropTypes.func.isRequired,
};

SchedulerView.defaultProps = {
    data: [],
};

export default SchedulerView;
