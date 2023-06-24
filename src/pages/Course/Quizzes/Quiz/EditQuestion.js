import { useParams } from 'react-router-dom';
import { CourseLayout } from '~/components/Layouts';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { Editor } from '@tinymce/tinymce-react';
import { useState, useRef } from 'react';
import { CourseApi } from '~/services/api';
import { notification } from 'antd';
import { useNavigate, generatePath } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
const types = [
    {
        value: 'multiple_choice_question',
        label: 'Câu hỏi trắc nghiệm',
    },
    {
        value: 'true_false_question',
        label: 'Câu hỏi đúng sai',
    },
];

async function getQuizQuestion(payload) {
    try {
        const response = await CourseApi.getQuizQuestion(payload);
        return response.data;
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

export default function EditQuestion() {
    const { courseId, quizId, questionId } = useParams();
    const { data: question } = useGet(
        { courseId, quizId, questionId },
        getQuizQuestion,
        courseId !== undefined && questionId !== undefined && quizId !== undefined,
    );

    if (!question) {
        return null;
    }

    return <EditQuestionForm courseId={courseId} quizId={quizId} questionId={questionId} question={question} />;
}

const EditQuestionForm = ({ courseId, quizId, questionId, question }) => {
    const questionRef = useRef(null);
    const navigate = useNavigate();

    const [questionName, setQuestionName] = useState(question.question_name);
    const [type, setType] = useState(question.question_type);
    const [points, setPoints] = useState(question.points_possible);
    const [correctAnswer, setCorrectAnswer] = useState(
        question.answers[0] && question.answers[0].text ? question.answers[0].text : '',
    );
    const [wrongAnswer1, setWrongAnswer1] = useState(
        question.answers[1] && question.answers[1].text ? question.answers[1].text : '',
    );
    const [wrongAnswer2, setWrongAnswer2] = useState(
        question.answers[2] && question.answers[2].text ? question.answers[2].text : '',
    );
    const [wrongAnswer3, setWrongAnswer3] = useState(
        question.answers[3] && question.answers[3].text ? question.answers[3].text : '',
    );
    console.log(question);

    const handleQuestionName = (e) => {
        setQuestionName(e.target.value);
    };

    const handleType = (e) => {
        setType(e.target.value);
    };

    const handlePoints = (e) => {
        setPoints(e.target.value);
    };

    const handleCorrectAnswer = (e) => {
        setCorrectAnswer(e.target.value);
    };

    const handleWrongAnswer1 = (e) => {
        setWrongAnswer1(e.target.value);
    };

    const handleWrongAnswer2 = (e) => {
        setWrongAnswer2(e.target.value);
    };

    const handleWrongAnswer3 = (e) => {
        setWrongAnswer3(e.target.value);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (questionName === '') {
            notification.error({
                message: 'Câu hỏi không được để trống',
            });
            return;
        }

        if (type === '') {
            notification.error({
                message: 'Loại câu hỏi không được để trống',
            });
            return;
        }

        if (points === '') {
            notification.error({
                message: 'Điểm không được để trống',
            });
            return;
        }

        if (isNaN(points) || points < 0 || points > 10) {
            notification.error({
                message: 'Điểm phải là số và nằm trong khoảng từ 0 đến 10',
            });
            return;
        }

        const content = questionRef.current.getContent();
        var answers = [];
        if (type === 'multiple_choice_question') {
            answers = [
                {
                    answer_text: correctAnswer,
                    asnwer_weight: 0,
                },
                {
                    answer_text: wrongAnswer1,
                    asnwer_weight: 0,
                },
                {
                    answer_text: wrongAnswer2,
                    asnwer_weight: 0,
                },
                {
                    answer_text: wrongAnswer3,
                    asnwer_weight: 0,
                },
            ];
        } else {
            answers = [
                {
                    answer_text: 'Đúng',
                    asnwer_weight: 0,
                },
                {
                    answer_text: 'Sai',
                    asnwer_weight: 0,
                },
            ];
        }

        var payload = {
            courseId: courseId,
            quiz_id: quizId,
            id: questionId,
            question: {
                question_name: question,
                question_text: content,
                question_type: type,
                points_possible: points,
                answers,
            },
        };

        try {
            const res = await CourseApi.editQuizQuestion(payload);
            if (res.status === 200) {
                notification.success({
                    message: 'Thành công',
                    description: 'Sửa câu hỏi thành công',
                });
            }
            navigate(
                generatePath('/courses/:courseId/quizzes/:quizId', {
                    quizId: quizId,
                    courseId,
                }),
            );
        } catch (err) {
            notification.error({
                message: 'Lỗi',
                description: 'Sửa câu hỏi thất bại',
            });
        }
    };

    return (
        <CourseLayout courseId={courseId} title={`Các câu hỏi kiểm tra / ${quizId} / Thêm câu hỏi`}>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Sửa câu hỏi</h1>
            </div>

            <div className="bg-white rounded-lg shadow px-10 py-6">
                <form>
                    <div className="mb-4">
                        <TextField
                            id="outlined-basic"
                            label="Câu hỏi"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={questionName}
                            onChange={handleQuestionName}
                        />
                    </div>

                    <div className="mb-4">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Loại câu hỏi</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Loại câu hỏi"
                                value={type}
                                onChange={handleType}
                            >
                                {types.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                        {type.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="mb-4">
                        <TextField
                            id="outlined-basic"
                            label="Điểm"
                            variant="outlined"
                            fullWidth
                            value={points}
                            onChange={handlePoints}
                        />
                    </div>

                    <div className="mb-4">
                        <InputLabel>Câu hỏi</InputLabel>
                        <Editor
                            onInit={(evt, editor) => (questionRef.current = editor)}
                            id="question"
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
                            initialValue={question && question.question_text ? question.question_text : ''}
                        />{' '}
                    </div>
                    {type === 'multiple_choice_question' && (
                        <>
                            <div className="mb-4">
                                <InputLabel id="correct-answer">Đáp án đúng</InputLabel>
                                <TextField
                                    id="correct-answer"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleCorrectAnswer}
                                    value={correctAnswer}
                                />
                            </div>
                            <div className="mb-4">
                                <InputLabel id="correct-answer">Đáp án sai</InputLabel>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleWrongAnswer1}
                                    value={wrongAnswer1}
                                />
                            </div>
                            <div className="mb-4">
                                <InputLabel id="correct-answer">Đáp án sai</InputLabel>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleWrongAnswer2}
                                    value={wrongAnswer2}
                                />
                            </div>
                            <div className="mb-4">
                                <InputLabel id="correct-answer">Đáp án sai</InputLabel>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleWrongAnswer3}
                                    value={wrongAnswer3}
                                />
                            </div>
                        </>
                    )}

                    <div className="flex justify-end">
                        <Button variant="contained" color="primary" onClick={handleOnSubmit}>
                            Sửa câu hỏi
                        </Button>
                    </div>
                </form>
            </div>
        </CourseLayout>
    );
};
