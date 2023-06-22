import { Alert, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import useHead from '~/hooks/useHead';

function Notifications() {
    useHead({
        title: 'Thông báo',
    });

    const [settingType, setSettingType] = useState(10);

    const handleChange = (event) => {
        setSettingType(event.target.value);
    };

    return (
        <>
            <h2 className="mb-4 text-xl font-semibold">Cài đặt thông báo</h2>

            <Alert className="mb-2" severity="info" onClose={() => {}}>
                Các thông báo cấp tài khoản áp dụng cho tất cả các khóa học. Thông báo cho các khóa học riêng lẻ có thể
                được thay đổi trong mỗi khóa học và sẽ thay thế các thông báo này.
            </Alert>

            <Alert severity="info" onClose={() => {}}>
                Thông báo hàng ngày sẽ được gửi vào khoảng 18:00. Thông báo hàng tuần sẽ được gửi Thứ Bảy trong khoảng
                từ 15:00 đến 17:00.
            </Alert>

            <div className="mt-4">
                <div className="mb-2 font-semibold">Cài đặt cho</div>

                <Select size="small" value={settingType} onChange={handleChange}>
                    <MenuItem value={10}>Tài khoản</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </div>
        </>
    );
}

export default Notifications;
