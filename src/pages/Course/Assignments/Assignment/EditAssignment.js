import React, { useState, useEffect, useRef } from 'react';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    DialogTitle,
    Checkbox,
    FormGroup,
    FormControlLabel,
    InputLabel,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import { notification } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';
import { CourseApi, AccountApi } from '~/services/api';
import { assign } from '@fluentui/react';

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

export default function EditAssignmentForm({ title, css, assignmentGroups, assignment }) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [assignmentGroup, setAssignmentGroup] = useState();
    const [group, setGroup] = useState([]);
    const [attempt, setAttempt] = useState(1);
    const [score, setScore] = useState(0);
    const [open, setOpen] = useState(false);
    const [dueDate, setDueDate] = useState('');
    const [availableFrom, setAvailableFrom] = useState('');
    const [availableUntil, setAvailableUntil] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const editorRef = useRef(null);
    const { courseId } = useParams();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name === '') {
            notification.error({
                message: 'Lỗi',
                description: 'Tên bài tập không được để trống',
            });
            return;
        }

        if (score < 0 || score > 10 || isNaN(score)) {
            notification.error({
                message: 'Lỗi',
                description: 'Điểm phải nằm trong khoảng từ 1 đến 10',
            });
            return;
        }

        if (score === '') {
            notification.error({
                message: 'Lỗi',
                description: 'Score is required',
            });
            return;
        }

        if (attempt < 0 || isNaN(attempt)) {
            notification.error({
                message: 'Lỗi',
                description: 'Số lần thử phải là số nguyên dương',
            });
            return;
        }

        console.log('assignmentGroup', assignmentGroup);
        if (assignmentGroup <= 0) {
            notification.error({
                message: 'Lỗi',
                description: 'Nhóm bài tập không được để trống',
            });
            return;
        }

        const isoDueDate = dueDate ? new Date(dueDate).toISOString() : null;
        const isoAvailableFrom = availableFrom ? new Date(availableFrom).toISOString() : null;
        const isoAvailableUntil = availableUntil ? new Date(availableUntil).toISOString() : null;

        if (isoDueDate === 'Invalid Date') {
            notification.error({
                message: 'Lỗi',
                description: 'Ngày hết hạn không hợp lệ',
            });
            return;
        }

        if (isoAvailableFrom === 'Invalid Date') {
            notification.error({
                message: 'Lỗi',
                description: 'Ngày bắt đầu không hợp lệ',
            });
            return;
        }

        if (isoAvailableUntil === 'Invalid Date') {
            notification.error({
                message: 'Lỗi',
                description: 'Ngày kết thúc không hợp lệ',
            });
            return;
        }

        if (isoAvailableFrom > isoAvailableUntil) {
            notification.error({
                message: 'Lỗi',
                description: 'Ngày bắt đầu phải trước ngày kết thúc',
            });
            return;
        }

        if (isoDueDate < isoAvailableFrom || isoDueDate > isoAvailableUntil) {
            notification.error({
                message: 'Lỗi',
                description: 'Ngày hết hạn phải nằm trong khoảng ngày bắt đầu và ngày kết thúc',
            });
            return;
        }

        const content = editorRef.current.getContent();

        const payload = {
            courseId: courseId,
            assignment: {
                name,
                submission_types: ['online_text_entry'],
                assignment_group_id: assignmentGroup,
                points_possible: score,
                grade_type: 'points',
                due_at: isoDueDate,
                unlock_at: isoAvailableFrom,
                lock_at: isoAvailableUntil,
                published: isPublished,
                description: content,
                allowed_attemp: attempt,
            },
        };

        try {
            const res = await CourseApi.editAssignment(payload);
            console.log('res', res);
            if (res.status === 201) {
                notification.success({
                    message: 'Thành công',
                    description: 'Tạo bài tập thành công',
                });
            }

            setOpen(false);

            window.location.reload();
        } catch (err) {
            notification.error({
                message: 'Lỗi',
                description: 'Tạo bài tập thất bại',
            });
        }
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

    const handleDueDateChange = (event) => {
        setDueDate(event.target.value);
    };

    const handleAvailableFromChange = (event) => {
        setAvailableFrom(event.target.value);
    };

    const handleAvailableUntilChange = (event) => {
        setAvailableUntil(event.target.value);
    };

    const handlePublishedChange = (event) => {
        setIsPublished(event.target.checked);
    };

    const handleAttemptChange = (event) => {
        setAttempt(event.target.value);
    };

    useEffect(() => {
        setGroup(assignmentGroups);
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
                    <DialogTitle classes={{ root: classes.title }}>{title}</DialogTitle>
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
                        <InputLabel id="score-label" className="mt-5">
                            Điểm
                        </InputLabel>
                        <TextField
                            id="score"
                            labelId="score-label"
                            autoFocus
                            variant="standard"
                            fullWidth
                            sx={{ mb: 3, mt: 1 }}
                            onChange={handleScoreChange}
                        />
                        <Select
                            id="grading_type"
                            labelId="grading-label"
                            defaultValue="points"
                            disabled
                            hidden
                            fullWidth
                            sx={{ mb: 3 }}
                        >
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
                            {assignmentGroups && assignmentGroups.length > 0 ? (
                                assignmentGroups.map((group) => (
                                    <MenuItem key={group.id} value={group.id}>
                                        {group.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem value="0">Không có nhóm bài tập nào</MenuItem>
                            )}
                        </Select>
                        <InputLabel id="type-label">Kiểu nộp</InputLabel>
                        <Select
                            id="submisstionType"
                            labelId="type-label"
                            defaultValue="online_text_entry"
                            disabled
                            fullWidth
                            sx={{ mb: 3 }}
                        >
                            <MenuItem value="online_text_entry">Online</MenuItem>
                        </Select>
                        <InputLabel id="attemp-label">Số lần nộp</InputLabel>
                        <Select
                            labelId="attemp-label"
                            id="attempt"
                            defaultValue={attempt}
                            fullWidth
                            label="Số lần nộp"
                            onChange={handleAttemptChange}
                            sx={{ mb: 3 }}
                        >
                            <MenuItem value="1">Giới hạn 1 lần</MenuItem>
                            <MenuItem value="-1">Không giới hạn</MenuItem>
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
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={isPublished} onChange={handlePublishedChange} />}
                                label="Công khai"
                            />
                        </FormGroup>{' '}
                        <Button
                            type="submit"
                            variant="contained"
                            classes={{ root: classes.button }}
                            onClick={handleSubmit}
                        >
                            Tạo
                        </Button>
                    </form>
                </div>
            </Dialog>
        </div>
    );
}
