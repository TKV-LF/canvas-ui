import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, DialogTitle } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import { notification } from 'antd';
import store from 'store';

import { CourseApi } from '~/services/api';

const useStyles = makeStyles(() => ({
    button: {
        backgroundColor: '#3f51b5',
        color: 'white',
        margin: '10px 0px 0px 15px',
        '&:hover': {
            backgroundColor: '#3f51b5',
            color: 'white',
        },
    },
    title: {
        padding: '0px !important',
        color: '#3f51b5',
    },
}));

const licenses = [
    {
        name: 'Private (Copyrighted)',
        id: 'private',
    },
    {
        name: 'Public Domain',
        id: 'public_domain',
    },
    {
        name: 'CC Atribution',
        id: 'cc_by',
    },
    {
        name: 'CC Atribution Share Alike',
        id: 'cc_by_sa',
    },
    {
        name: 'CC Atribution No Derivatives',
        id: 'cc_by_nd',
    },
    {
        name: 'CC Atribution Non Commercial',
        id: 'cc_by_nc',
    },
    {
        name: 'CC Atribution Non Commercial Share Alike',
        id: 'cc_by_nc_sa',
    },
    {
        name: 'CC Atribution Non Commercial No Derivatives',
        id: 'cc_by_nc_nd',
    },
];

export default function CreateCourseForm({ title, css }) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [license, setLicense] = useState('private');
    const [isPublic, setIsPublic] = useState(false);
    const [accountId, setAccountId] = useState(null);
    const [open, setOpen] = useState(false);
    const accounts = JSON.parse(localStorage.getItem('accounts'));
    const user = store.get('user');
    console.log(user);
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleLicenseChange = (event) => {
        setLicense(event.target.value);
    };

    const handleIsPublicChange = (event) => {
        setIsPublic(event.target.checked);
    };

    const handleAccountIdChange = (event) => {
        setAccountId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name === '') {
            notification.error({
                message: 'Tên khoá học không được để trống',
            });
            return;
        }

        if (name.length > 255) {
            notification.error({
                message: 'Tên khoá học không được quá 255 ký tự',
            });

            return;
        }

        if (license === '') {
            notification.error({
                message: 'Vui lòng chọn giấy phép',
            });
            return;
        }

        if (accountId === null) {
            notification.error({
                message: 'Vui lòng chọn workspace',
            });
            return;
        }

        const payload = {
            course: {
                name,
                course_code: name,
                license,
                is_public: isPublic,
                accountId: 3,
                enroll_me: true,
            },
        };
        try {
            const response = await CourseApi.createCourse(payload);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} className={css}>
                {title}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <div className="p-6">
                    <DialogTitle classes={{ root: classes.title }}>Tạo mới một khoá học</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="name"
                            label="Tên khoá học"
                            autoFocus
                            variant="standard"
                            fullWidth
                            sx={{ mb: 1 }}
                            value={name}
                            onChange={handleNameChange}
                        />
                        <Select
                            labelId="select-label"
                            id="select"
                            value={license}
                            fullWidth
                            sx={{ mb: 1 }}
                            onChange={handleLicenseChange}
                            label="Chọn giấy phép"
                        >
                            {licenses.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <Select
                            labelId="select-label"
                            id="accountId"
                            value={accountId}
                            fullWidth
                            sx={{ mb: 1 }}
                            onChange={handleAccountIdChange}
                            label="Chọn tài khoản"
                        >
                            {/* {accounts.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))} */}
                        </Select>

                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={isPublic} onChange={handleIsPublicChange} />}
                                label="Công khai"
                            />
                        </FormGroup>
                        <Button type="submit" variant="contained" classes={{ root: classes.button }}>
                            Tạo
                        </Button>
                    </form>
                </div>
            </Dialog>
        </div>
    );
}
