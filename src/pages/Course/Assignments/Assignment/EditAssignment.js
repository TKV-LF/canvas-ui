import React, { useState, useEffect, useRef, useCallback } from 'react';
import moment from 'moment';
import { TextField, Button, Select, MenuItem, Checkbox, FormGroup, FormControlLabel, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { notification } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
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

async function getAssignment({ courseId, assignmentId }) {
    try {
        const response = await CourseApi.getAssignment({ courseId, assignmentId });
        return response.data;
    } catch (error) {
        // Rethrow the error to allow error handling further up the call stack
        throw error;
    }
}

async function getAssignmentGroups({ courseId }) {
    try {
        const response = await CourseApi.getAssignmentGroups({ courseId });

        return response;
    } catch (error) {
        // Rethrow the error to allow error handling further up the call stack
        throw error;
    }
}

const useGet = (params, getter, enable) => {
    const [state, setState] = useState();

    const callApi = useCallback(async () => {
        try {
            const res = await getter(params);

            setState(res);
        } catch (e) {
            throw e;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(params), getter]);

    useEffect(() => {
        if (enable) {
            callApi();
        }
    }, [enable, callApi]);

    return {
        data: state,
    };
};

export default function EditAssignment() {
    const { courseId, assignmentId } = useParams();
    const { data: assignment } = useGet(
        { courseId, assignmentId },
        getAssignment,
        courseId !== undefined && assignmentId !== undefined,
    );
    const { data: assignmentGroups = [] } = useGet({ courseId }, getAssignmentGroups, courseId !== undefined);

    console.log({
        assignment,
        assignmentGroups,
    });

    if (!assignment) {
        return null;
    }

    return <EditAssignmentForm assignment={assignment} assignmentGroups={assignmentGroups} />;
}

const toLocalDate = (dateStr) => {
    if (!dateStr) {
        return;
    }

    return moment(dateStr).format('YYYY-MM-DDTHH:mm');
};

function EditAssignmentForm({ assignmentGroups, assignment }) {
    const classes = useStyles();
    const [name, setName] = useState(assignment.name);
    const [assignmentGroup, setAssignmentGroup] = useState(assignment.assignment_group_id);
    const [attempts, setAttempts] = useState(assignment.allowed_attempts);
    const [score, setScore] = useState(assignment.points_possible);
    const [dueDate, setDueDate] = useState(toLocalDate(assignment.due_at));
    const [availableFrom, setAvailableFrom] = useState(toLocalDate(assignment.unlock_at));
    const [availableUntil, setAvailableUntil] = useState(toLocalDate(assignment.lock_at));
    const [isPublished, setIsPublished] = useState(assignment.published);
    const editorRef = useRef(null);
    const { courseId } = useParams();
    const navigate = useNavigate();

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

        if (isNaN(attempts)) {
            notification.error({
                message: 'Lỗi',
                description: 'Số lần thử phải là số nguyên',
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
            courseId,
            assignmentId: assignment.id,
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
                allowed_attempts: attempts,
            },
        };

        try {
            const res = await CourseApi.editAssignment(payload);
            console.log('res', res);
            if (res.status === 201) {
                notification.success({
                    message: 'Thành công',
                    description: 'Sửa bài tập thành công',
                });
            }

            navigate(
                generatePath('/courses/:courseId/assignments/:assignmentId', {
                    assignmentId: assignment.id,
                    courseId,
                }),
            );
        } catch (err) {
            notification.error({
                message: 'Lỗi',
                description: 'Sửa bài tập thất bại',
            });
        }
    };

    const handleAssignmentGroupChange = (event) => {
        setAssignmentGroup(event.target.value);
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
        setAttempts(Number(event.target.value));
    };

    return (
        <div className="mx-72 py-8 px-12 border">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="name"
                    label="Tên bài tập"
                    autoFocus
                    variant="standard"
                    fullWidth
                    sx={{ mb: 3 }}
                    onChange={handleNameChange}
                    value={name}
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
                    initialValue={assignment.description}
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
                    value={score}
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
                    value={assignmentGroup}
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
                    value={attempts.toString()}
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
                </FormGroup>
                <Button type="submit" variant="contained" classes={{ root: classes.button }} onClick={handleSubmit}>
                    Lưu
                </Button>
            </form>
        </div>
    );
}
