import { Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import 'moment/locale/vi';
import { USER_ROLES, ENROLLMENT_STATE } from '~/constants';
import ButtonAction from './ButtonAction';

function UserList({ data }) {
    moment.locale('vi');

    const getUserRole = (roleValue) => {
        const role = USER_ROLES.find((role) => role.value === roleValue);
        return role ? role.label : '';
    };

    const getEnrollmentState = (stateValue) => {
        const state = ENROLLMENT_STATE.find((state) => state.value === stateValue);
        return state ? state : '';
    };

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Tên', flex: 1, valueGetter: (params) => params.row.user.name },
        {
            field: 'last_activity_at',
            headerName: 'Hoạt động cuối',
            flex: 1,
            valueGetter: (params) =>
                params.row.last_activity_at ? moment(params.row.last_activity_at).format('DD MMM yyyy tại hh:mm') : '',
        },
        {
            field: 'total_activity_time',
            headerName: 'Tổng số hoạt động',
            flex: 1,
            valueGetter: (params) =>
                params.row.total_activity_time
                    ? moment.utc(params.row.total_activity_time * 1000).format('HH:mm:ss')
                    : '',
        },
        { field: 'role', headerName: 'Vai trò', flex: 1, valueGetter: (params) => getUserRole(params.row.role) },
        {
            field: 'enrollment_state',
            headerName: 'Trạng thái',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Chip
                        label={getEnrollmentState(params.row.enrollment_state).label}
                        size="small"
                        sx={{
                            backgroundColor: getEnrollmentState(params.row.enrollment_state).backgroundColor,
                            color: getEnrollmentState(params.row.enrollment_state).textColor,
                        }}
                    ></Chip>
                );
            },
        },
        {
            field: 'action',
            headerName: '',
            width: 50,
            renderCell: (params) => {
                return <ButtonAction user={params.row.user} />;
            },
        },
    ];

    return (
        <DataGrid
            rows={data}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            columnVisibilityModel={{
                id: false,
            }}
            pageSizeOptions={[10, 20, 30]}
        />
    );
}

export default UserList;
