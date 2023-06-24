import { CalendarApi } from '~/services/api';

const Func = () => {
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
                return events;
            });
        });
    return [];
};

export const appointments = Func();
