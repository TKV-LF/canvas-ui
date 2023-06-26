const STATE_COLOR = {
    active: { backgroundColor: '#00FF00', textColor: '#FFFFFF' }, // green with white text
    invited: { backgroundColor: '#0000FF', textColor: '#FFFFFF' }, // blue with white text
    creation_pending: { backgroundColor: '#FFA500', textColor: '#000000' }, // orange with black text
    deleted: { backgroundColor: '#FF0000', textColor: '#FFFFFF' }, // red with white text
    rejected: { backgroundColor: '#800080', textColor: '#FFFFFF' }, // purple with white text
    completed: { backgroundColor: '#008080', textColor: '#FFFFFF' }, // teal with white text
    inactive: { backgroundColor: '#808080', textColor: '#000000' }, // gray with black text
    current_and_invited: { backgroundColor: '#FFFF00', textColor: '#000000' }, // yellow with black text
    current_and_future: { backgroundColor: '#00FFFF', textColor: '#000000' }, // cyan with black text
    current_and_concluded: { backgroundColor: '#A52A2A', textColor: '#FFFFFF' }, // brown with white text
};

export const ENROLLMENT_STATE = [
    {
        value: 'active',
        label: 'Đang học',
        backgroundColor: STATE_COLOR['active'].backgroundColor,
        textColor: STATE_COLOR['active'].textColor,
    },
    {
        value: 'invited',
        label: 'Đã mời',
        backgroundColor: STATE_COLOR['invited'].backgroundColor,
        textColor: STATE_COLOR['invited'].textColor,
    },
    {
        value: 'creation_pending',
        label: 'Đang chờ',
        backgroundColor: STATE_COLOR['creation_pending'].backgroundColor,
        textColor: STATE_COLOR['creation_pending'].textColor,
    },
    {
        value: 'deleted',
        label: 'Đã xóa',
        backgroundColor: STATE_COLOR['deleted'].backgroundColor,
        textColor: STATE_COLOR['deleted'].textColor,
    },
    {
        value: 'rejected',
        label: 'Đã từ chối',
        backgroundColor: STATE_COLOR['rejected'].backgroundColor,
        textColor: STATE_COLOR['rejected'].textColor,
    },
    {
        value: 'completed',
        label: 'Đã hoàn thành',
        backgroundColor: STATE_COLOR['completed'].backgroundColor,
        textColor: STATE_COLOR['completed'].textColor,
    },
    {
        value: 'inactive',
        label: 'Không hoạt động',
        backgroundColor: STATE_COLOR['inactive'].backgroundColor,
        textColor: STATE_COLOR['inactive'].textColor,
    },
    {
        value: 'current_and_invited',
        label: 'Đang học và đã mời',
        backgroundColor: STATE_COLOR['current_and_invited'].backgroundColor,
        textColor: STATE_COLOR['current_and_invited'].textColor,
    },
    {
        value: 'current_and_future',
        label: 'Đang học và tương lai',
        backgroundColor: STATE_COLOR['current_and_future'].backgroundColor,
        textColor: STATE_COLOR['current_and_future'].textColor,
    },
    {
        value: 'current_and_concluded',
        label: 'Đang học và kết thúc',
        backgroundColor: STATE_COLOR['current_and_concluded'].backgroundColor,
        textColor: STATE_COLOR['current_and_concluded'].textColor,
    },
];
