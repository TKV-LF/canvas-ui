import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DetailsList, SelectionMode } from '@fluentui/react';
import { CalendarApi } from '~/services/api';
import { ConvertDate } from '~/utils/heplers';

function List() {
    const columns = [
        {
            key: 'title',
            name: 'Tên sự kiện',
            fieldName: 'title',
            minWidth: 200,
            maxWidth: 200,
            isResizable: true,
        },
        {
            key: 'startDate',
            name: 'Thời gian bắt đầu',
            fieldName: 'startDate',
            minWidth: 200,
            maxWidth: 200,
        },
        {
            key: 'endDate',
            name: 'Thời gian kết thúc',
            fieldName: 'endDate',
            minWidth: 200,
            maxWidth: 200,
        },
    ];
    const [data, setData] = useState([]);

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
                        startDate: ConvertDate(event.start_at),
                        endDate: ConvertDate(event.end_at),
                        notes: event.notes,
                        location: event.location,
                        userId: event.user_id,
                        createdAt: ConvertDate(event.created_at),
                        updatedAt: ConvertDate(event.updated_at),
                    });
                    setData(events);
                });
            });
    }, [data]);

    return (
        <>
            <DetailsList
                setKey="items"
                items={data}
                columns={columns}
                selectionMode={SelectionMode.multiple}
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                ariaLabelForSelectionColumn="Toggle selection"
                checkButtonAriaLabel="Row checkbox"
            />
        </>
    );
}

List.propTypes = {
    data: PropTypes.array.isRequired,
};

List.defaultProps = {
    data: [],
};

export default List;
