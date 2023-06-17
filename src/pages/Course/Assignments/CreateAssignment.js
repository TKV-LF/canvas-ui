import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Select, MenuItem, DialogTitle, FormControl, InputLabel } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import { notification } from 'antd';
import store from 'store';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { CourseApi, AccountApi } from '~/services/api';

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

export default function CreateAssignmentForm({ title, css, courseId, assignments }) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [assignmentGroup, setAssignmentGroup] = useState('private');
    const [assignmentGroups, setAssignmentGroups] = useState([]);
    const [score, setScore] = useState(0);
    const [open, setOpen] = useState(false);
    const [assignTo, setAssignTo] = useState([]);
    const [dueDate, setDueDate] = useState('');
    const [availableFrom, setAvailableFrom] = useState('');
    const [availableUntil, setAvailableUntil] = useState('');
    const editorRef = useRef(null);
    const { id } = useParams();

    // const accounts = JSON.parse(localStorage.getItem('accounts'));
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAssignmentGroupChange = (event) => {
        setAssignmentGroup(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleScoreChange = (event) => {
        setScore(event.target.value);
    };

    const handleAssignToChange = (event) => {
        setAssignTo(event.target.value);
    };

    const handleDueDateChange = (event) => {
        setDueDate(event.target.value);
    };

    const handleAvailableFromChange = (event) => {
        setAvailableFrom(event.target.value);
    };

    const handleAvailableUntilChange = (event) => {
        setAvailableUntil(event.target.value);
    };

    useEffect(() => {
        setAssignmentGroups(assignments);
    }, []);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} className={css}>
                {title}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '900px', // Set the desired width here
                    },
                }}
            >
                <div className="p-6">
                    <DialogTitle classes={{ root: classes.title }}>Tạo mới một bài tập</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="name"
                            label="Tên bài tập"
                            autoFocus
                            variant="standard"
                            fullWidth
                            sx={{ mb: 3 }}
                            onChange={handleNameChange}
                        />
                        <Editor
                            onInit={(evt, editor) => (editorRef.current = editor)}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                ],
                                toolbar:
                                    'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            }}
                        />
                        <TextField
                            id="score"
                            label="Điểm"
                            value="0"
                            autoFocus
                            variant="standard"
                            fullWidth
                            sx={{ mb: 3, mt: 1 }}
                            onChange={handleScoreChange}
                        />
                        <Select id="grading_type" defaultValue="points" disabled fullWidth sx={{ mb: 3 }}>
                            <MenuItem value="points">Điểm thành phần</MenuItem>
                        </Select>

                        <InputLabel id="assignment-label">Nhóm bài tập</InputLabel>
                        <Select
                            id="assignment"
                            labelId="assignment-label"
                            fullWidth
                            sx={{ mb: 5 }}
                            onChange={handleAssignmentGroupChange}
                            defaultValue="0"
                        >
                            <MenuItem value="0">---Vui lòng chọn nhóm bài tập---</MenuItem>
                            {assignmentGroups.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <InputLabel id="type-label">Kiểu nộp</InputLabel>
                        <Select
                            id="type"
                            hidden
                            labelId="type-label"
                            defaultValue="online"
                            disabled
                            fullWidth
                            sx={{ mb: 3 }}
                        >
                            <MenuItem value="online">Online</MenuItem>
                        </Select>

                        <InputLabel id="attemp-label">Số lần nộp</InputLabel>
                        <Select
                            labelId="attemp-label"
                            id="attempt"
                            defaultValue="limited"
                            fullWidth
                            label="Số lần nộp"
                            sx={{ mb: 3 }}
                        >
                            <MenuItem value="limited">Giới hạn</MenuItem>
                            <MenuItem value="unlimited">Không giới hạn</MenuItem>
                        </Select>

                        <InputLabel id="assign-to-label">Chỉ định cho</InputLabel>
                        <Select
                            labelId="assign-to-label"
                            id="assign-to"
                            multiple
                            value={assignTo}
                            fullWidth
                            sx={{ mb: 3 }}
                            onChange={handleAssignToChange}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            <MenuItem value="user1">User 1</MenuItem>
                            <MenuItem value="user2">User 2</MenuItem>
                            <MenuItem value="user3">User 3</MenuItem>
                        </Select>
                        <br />
                        <TextField
                            label="Đến hạn"
                            type="datetime-local"
                            value={dueDate}
                            onChange={handleDueDateChange}
                            fullWidth
                            sx={{ mb: 3 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        <TextField
                            label="Bắt đầu"
                            type="datetime-local"
                            value={availableFrom}
                            fullWidth
                            sx={{ mb: 3 }}
                            onChange={handleAvailableFromChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        <TextField
                            label="Kết thúc"
                            type="datetime-local"
                            value={availableUntil}
                            fullWidth
                            sx={{ mb: 3 }}
                            onChange={handleAvailableUntilChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button type="submit" variant="contained" classes={{ root: classes.button }}>
                            Tạo
                        </Button>
                    </form>
                </div>
            </Dialog>
        </div>
    );
}
