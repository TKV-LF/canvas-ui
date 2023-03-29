import apiClient from '~/services/axios';

const CalendarApi = () => {
    const getAllEvents = async (payload) => {
        try {
            const response = await apiClient.get('/api/v1/calendar_events', payload);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    };

    const getEventForUser = async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/users/${payload.userId}/calendar_events`);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    };

    const getEvent = async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/calendar_events/${payload.eventId}`);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    };

    const createEvent = async (payload) => {
        try {
            const response = await apiClient.post('/api/v1/calendar_events', payload);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    };

    const updateEvent = async (payload) => {
        try {
            const response = await apiClient.put(`/api/v1/calendar_events/${payload.eventId}`, payload);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    };

    const deleteEvent = async (payload) => {
        try {
            const response = await apiClient.delete(`/api/v1/calendar_events/${payload.eventId}`);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    };

    const saveEnableAccountCalendar = async (payload) => {
        try {
            const response = await apiClient.put(`/api/v1/calendar_events/save_enabled_account_calendars`, payload);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    };

    const setCourseTimetable = async (payload) => {
        try {
            const response = await apiClient.put(
                `/api/v1/courses/${payload.courseId}/calendar_events/timetable`,
                payload,
            );
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    };

    const getCourseTimetable = async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/courses/${payload.courseId}/calendar_events/timetable`);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    };

    // Create or update events directly for a course timetable
    // Creates and updates “timetable” events for a course or course section. Similar to setting a course timetable,
    // but instead of generating a list of events based on a timetable schedule, this endpoint expects a complete list of events.

    const createEventsDirectly = async (payload) => {
        try {
            const response = await apiClient.post(
                `/api/v1/courses/${payload.courseId}/calendar_events/timetable_events`,
                payload,
            );
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    };

    return {
        getAllEvents,
        getEventForUser,
        getEvent,
        createEvent,
        updateEvent,
        deleteEvent,
        saveEnableAccountCalendar,
        setCourseTimetable,
        getCourseTimetable,
        createEventsDirectly,
    };
};

export default CalendarApi;
