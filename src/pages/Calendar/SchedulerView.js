import React, { useState } from "react";
import PropTypes from "prop-types";
import { ViewState, EditingState, IntegratedEditing } from "@devexpress/dx-react-scheduler";
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
	EditRecurrenceMenu
} from "@devexpress/dx-react-scheduler-material-ui";

function SchedulerView(props) {
	const { data, onCurrentDateChange } = props;

	const [currentViewName, setCurrentViewName] = useState("Month");

	const onCommitChanges = ({ added, changed, deleted }) => {
		if (added) {
			const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
			data.push({ id: startingAddedId, ...added });
		}
		if (changed) {
			data[data.findIndex((appointment) => appointment.id === changed.id)] = {
				...data[data.findIndex((appointment) => appointment.id === changed.id)],
				...changed,
			};
		}
		if (deleted !== undefined) {
			data.splice(data.findIndex((appointment) => appointment.id === deleted), 1);
		}

	};

	return (

		<Scheduler data={data} >
			<ViewState
				currentViewName={currentViewName}
				onCurrentViewNameChange={setCurrentViewName}
				onCurrentDateChange={onCurrentDateChange}
			/>
			<EditingState onCommitChanges={onCommitChanges} />
			<IntegratedEditing />
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
			<CurrentTimeIndicator
				shadePreviousCells={true}
				shadePreviousAppointments={true}
				updateInterval={10000}
			/>
			<AppointmentForm readOnly />
		</Scheduler>
	);
}

SchedulerView.propTypes = {
	data: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	onCurrentDateChange: PropTypes.func.isRequired,
	onCommitChanges: PropTypes.func.isRequired
};

SchedulerView.defaultProps = {
	data: []
};

export default SchedulerView;
