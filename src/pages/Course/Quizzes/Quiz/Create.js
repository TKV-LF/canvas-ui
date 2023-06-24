import React, { useEffect, useState, useCallback, useRef } from 'react';
import { CourseApi } from '~/services/api';
import moment from 'moment';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    Checkbox,
    FormGroup,
    FormControl,
    FormControlLabel,
    InputLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { notification } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { CourseLayout } from '~/components/Layouts';

const useStyles = makeStyles(() => ({
    button: {
        backgroundColor: '#3f51b5',
        color: 'white',
        margin: '10px 0px 0px 0px',
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

export default function CreateQuiz() {
    const { courseId } = useParams();
    const { data: assignmentGroups = [] } = useGet({ courseId }, getAssignmentGroups, courseId !== undefined);

    console.log({
        assignmentGroups,
    });

    return <CreateQuizForm assignmentGroups={assignmentGroups} />;
}

const toLocalDate = (dateStr) => {
    if (!dateStr) {
        return;
    }

    return moment(dateStr).format('YYYY-MM-DDTHH:mm');
};
function CreateQuizForm({ assignmentGroups }) {
    const classes = useStyles();
    const [name, setName] = useState();
    const [assignmentGroup, setAssignmentGroup] = useState();
    const [timeLimit, setTimeLimit] = useState();
    const [shuffleQuestions, setShuffleQuestions] = useState();
    const [hideResults, setHideResults] = useState();
    const [showCorrectAnswers, setShowCorrectAnswers] = useState();
    const [showCorrectAnswersLastAttempt, setShowCorrectAnswersLastAttempt] = useState();
    const [showCorrectAnswersAt, setShowCorrectAnswersAt] = useState();
    const [hideCorrectAnswersAt, setHideCorrectAnswersAt] = useState();
    const [oneTimeResults, setOneTimeResults] = useState();
    const [allowedAttemps, setAllowedAttemps] = useState();
    const [scoringPolicy, setScoringPolicy] = useState();
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState();
    const [cantGoBack, setCantGoBack] = useState();
    const [dueDate, setDueDate] = useState(toLocalDate());
    const [availableFrom, setAvailableFrom] = useState(toLocalDate());
    const [availableUntil, setAvailableUntil] = useState(toLocalDate());
    const [isPublished, setIsPublished] = useState();

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

        console.log('assignmentGroup', assignmentGroup);
        if (assignmentGroup <= 0) {
            notification.error({
                message: 'Lỗi',
                description: 'Nhóm bài tập không được để trống',
            });
            return;
        }

        if (timeLimit <= 0) {
            notification.error({
                message: 'Lỗi',
                description: 'Thời gian làm bài không được nhỏ hơn 0',
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
            quiz: {
                title: name,
                quiz_type: 'assignment',
                assignment_group_id: assignmentGroup,
                time_limit: timeLimit,
                shuffle_answers: shuffleQuestions,
                hide_results: hideResults,
                show_correct_answers: showCorrectAnswers,
                show_correct_answers_last_attempt: showCorrectAnswersLastAttempt,
                show_correct_answers_at: isoAvailableFrom,
                hide_correct_answers_at: isoAvailableUntil,
                one_time_results: oneTimeResults,
                allowed_attempts: allowedAttemps,
                scoring_policy: scoringPolicy,
                one_question_at_a_time: oneQuestionAtATime,
                cant_go_back: cantGoBack,
                published: isPublished,
                due_at: isoDueDate,
                unlock_at: isoAvailableFrom,
                lock_at: isoAvailableUntil,
                description: content,
            },
        };

        try {
            const res = await CourseApi.createQuiz(payload);
            console.log('res', res);
            if (res.status === 200) {
                notification.success({
                    message: 'Thành công',
                    description: 'Thêm mới câu hỏi kiểm tra thành công',
                });
            }
            navigate(
                generatePath('/courses/:courseId/quizzes/:quizId', {
                    quizId: res.data.id,
                    courseId,
                }),
            );
        } catch (err) {
            notification.error({
                message: 'Lỗi',
                description: 'Sửa câu hỏi kiểm tra thất bại',
            });
        }
    };

    const handleAssignmentGroupChange = (event) => {
        setAssignmentGroup(event.target.value);
    };

    const handleTimeLimitChange = (event) => {
        setTimeLimit(event.target.value);
    };

    const handleShuffleQuestionsChange = (event) => {
        setShuffleQuestions(event.target.checked);
    };

    const handleHideResultsChange = (event) => {
        setHideResults(event.target.checked);
    };

    const handleShowCorrectAnswersChange = (event) => {
        setShowCorrectAnswers(event.target.checked);
    };

    const handleShowCorrectAnswersLastAttemptChange = (event) => {
        setShowCorrectAnswersLastAttempt(event.target.checked);
    };

    const handleShowCorrectAnswersAtChange = (event) => {
        setShowCorrectAnswersAt(event.target.value);
    };

    const handleHideCorrectAnswersAtChange = (event) => {
        setHideCorrectAnswersAt(event.target.value);
    };

    const handleAllowedAttempsChange = (event) => {
        setAllowedAttemps(event.target.value);
    };

    const handleOneTimeResultsChange = (event) => {
        setOneTimeResults(event.target.checked);
    };

    const handleScoringPolicyChange = (event) => {
        setScoringPolicy(event.target.value);
    };

    const handleOneQuestionAtATimeChange = (event) => {
        setOneQuestionAtATime(event.target.checked);
    };

    const handleCantGoBackChange = (event) => {
        setCantGoBack(event.target.checked);
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

    const handleIsPublishedChange = (event) => {
        setIsPublished(event.target.checked);
    };

    return (
        <CourseLayout courseId={courseId} title="Các câu hỏi kiểm tra / Thêm mới">
            Thêm mới câu hỏi kiểm tra
            <div className="px-12 pt-6 border">
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="name"
                        label="Tên câu hỏi"
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

                    <InputLabel id="assignment-label">Nhóm bài tập</InputLabel>
                    <Select
                        id="assignment"
                        labelId="assignment-label"
                        fullWidth
                        sx={{ mb: 3 }}
                        onChange={handleAssignmentGroupChange}
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

                    <TextField
                        id="time-limit"
                        label="Thời gian làm bài (phút)"
                        type="number"
                        variant="standard"
                        fullWidth
                        sx={{ mb: 3 }}
                        onChange={handleTimeLimitChange}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={shuffleQuestions}
                                onChange={handleShuffleQuestionsChange}
                                name="shuffle-questions"
                                color="primary"
                            />
                        }
                        label="Xáo trộn câu hỏi"
                    />

                    <br />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={hideResults}
                                onChange={handleHideResultsChange}
                                name="hide-results"
                                color="primary"
                            />
                        }
                        label="Ẩn kết quả"
                    />
                    {hideResults && (
                        <>
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={showCorrectAnswersLastAttempt}
                                        onChange={handleShowCorrectAnswersLastAttemptChange}
                                        name="show-correct-answers-last-attempt"
                                        color="primary"
                                    />
                                }
                                label="Hiển thị đáp án đúng sau lần làm cuối"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={showCorrectAnswers}
                                        onChange={handleShowCorrectAnswersChange}
                                        name="show-correct-answers"
                                        color="primary"
                                    />
                                }
                                label="Hiển thị đáp án đúng"
                            />

                            {showCorrectAnswers && (
                                <>
                                    <TextField
                                        label="Hiển thị đáp án đúng sau"
                                        type="datetime-local"
                                        onChange={handleShowCorrectAnswersAtChange}
                                        fullWidth
                                        sx={{ mb: 3, mt: 3 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <TextField
                                        label="Ẩn đáp án đúng sau"
                                        type="datetime-local"
                                        onChange={handleHideCorrectAnswersAtChange}
                                        fullWidth
                                        sx={{ mb: 3 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </>
                            )}
                        </>
                    )}

                    <br />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={oneQuestionAtATime}
                                onChange={handleOneQuestionAtATimeChange}
                                name="one-question-at-a-time"
                                color="primary"
                            />
                        }
                        label="Một câu hỏi một lần"
                    />

                    {oneQuestionAtATime && (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={cantGoBack}
                                    onChange={handleCantGoBackChange}
                                    name="cant-go-back"
                                    color="primary"
                                />
                            }
                            label="Khoá câu hỏi đã trả lời"
                        />
                    )}
                    <br />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={oneTimeResults}
                                onChange={handleOneTimeResultsChange}
                                name="one-time-results"
                                color="primary"
                            />
                        }
                        label="Cho phép nộp nhiều lần"
                    />

                    {oneTimeResults && (
                        <div className="mx-5">
                            <br />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Chính sách điểm</FormLabel>
                                <RadioGroup
                                    aria-label="scoring-policy"
                                    name="scoring-policy"
                                    onChange={handleScoringPolicyChange}
                                >
                                    <FormControlLabel
                                        value="keep_highest"
                                        control={<Radio />}
                                        label="Giữ điểm cao nhất"
                                    />
                                    <FormControlLabel
                                        value="keep_latest"
                                        control={<Radio />}
                                        label="Giữ điểm mới nhất"
                                    />
                                </RadioGroup>
                            </FormControl>

                            <TextField
                                label="Số lần làm bài"
                                type="number"
                                onChange={handleAllowedAttempsChange}
                                fullWidth
                                sx={{ mb: 3, mt: 3 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    )}

                    <br />
                    <TextField
                        label="Đến hạn"
                        type="datetime-local"
                        onChange={handleDueDateChange}
                        fullWidth
                        sx={{ mb: 3, mt: 3 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />
                    <TextField
                        label="Bắt đầu"
                        type="datetime-local"
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
                        fullWidth
                        sx={{ mb: 3 }}
                        onChange={handleAvailableUntilChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <br />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isPublished}
                                onChange={handleIsPublishedChange}
                                name="is-published"
                                color="primary"
                            />
                        }
                        label="Công khai"
                    />

                    <br />

                    <Button type="submit" variant="contained" classes={{ root: classes.button }} onClick={handleSubmit}>
                        Lưu
                    </Button>
                </form>
            </div>
        </CourseLayout>
    );
}
