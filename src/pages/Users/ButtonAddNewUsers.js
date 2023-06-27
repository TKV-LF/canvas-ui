import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { UserApi } from '~/services/api';
import { notification } from 'antd';

function ButtonAddNewUsers({ refresh }) {
    const [visible, setVisible] = useState(false);
    const [emails, setEmails] = useState('');

    const handleAddUsers = async () => {
        if (!emails) return [];

        const emailsArray = emails.split(/[\s,]+/);

        const promises = emailsArray.map((email) =>
            UserApi.createUser({ user: { name: email }, pseudonym: { unique_id: email } }),
        );

        await Promise.all(promises);

        return;
    };

    const handleClose = () => {
        setVisible(false);
        setEmails('');
    };

    const handleSubmit = async () => {
        await handleAddUsers();

        notification.success({
            message: 'Thành công',
            description: 'Thêm người dùng thành công.',
        });

        refresh();
        handleClose();
    };

    return (
        <>
            <Button startIcon={<AddIcon></AddIcon>} size="small" onClick={() => setVisible(true)}>
                Thêm người dùng mới
            </Button>

            <Dialog open={visible} onClose={handleClose}>
                <DialogTitle>Thêm người dùng mới (email)</DialogTitle>

                <DialogContent>
                    <TextField
                        placeholder="Khi thêm nhiều người dùng, hãy sử dụng dấu phẩy hoặc ngắt dòng để phân tách các người dùng."
                        sx={{ width: '400px' }}
                        multiline
                        rows={6}
                        value={emails}
                        variant="outlined"
                        onChange={(event) => setEmails(event.target.value)}
                    ></TextField>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>

                    <Button autoFocus onClick={handleSubmit}>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ButtonAddNewUsers;
