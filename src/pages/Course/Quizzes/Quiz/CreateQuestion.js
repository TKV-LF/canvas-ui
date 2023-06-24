import { useParams } from 'react-router-dom';
import { CourseLayout } from '~/components/Layouts';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { Editor } from '@tinymce/tinymce-react';
import { useState, useRef } from 'react';
import { CourseApi } from '~/services/api';
import { notification } from 'antd';
import { useNavigate, generatePath } from 'react-router-dom';

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

const CreateQuestion = () => {
    const { courseId, quizId } = useParams();
    const questionRef = useRef(null);
    const navigate = useNavigate();

    const [question, setQuestion] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [wrongAnswer1, setWrongAnswer1] = useState('');
    const [wrongAnswer2, setWrongAnswer2] = useState('');
    const [wrongAnswer3, setWrongAnswer3] = useState('');

    const [type, setType] = useState('multiple_choice_question');
    const [points, setPoints] = useState(1);

    const handleSetQuestion = (e) => {
        setQuestion(e.target.value);
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

    const handlePoints = (e) => {
        setPoints(e.target.value);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (question === '') {
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
            quizId: quizId,
            courseId: courseId,
            question: {
                question_name: question,
                question_text: content,
                question_type: type,
                points_possible: points,
                answers,
            },
        };

        try {
            const res = await CourseApi.createQuizQuestion(payload);
            if (res.status === 200) {
                notification.success({
                    message: 'Thành công',
                    description: 'Thêm mới câu hỏi thành công',
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
                description: 'Thêm câu hỏi thất bại',
            });
        }
    };

    return (
        <CourseLayout courseId={courseId} title={`Các câu hỏi kiểm tra / ${quizId} / Thêm câu hỏi`}>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Thêm câu hỏi</h1>
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
                            onChange={handleSetQuestion}
                        />
                    </div>

                    <div className="mb-4">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Loại câu hỏi</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Loại câu hỏi"
                                onChange={(e) => setType(e.target.value)}
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
                        />{' '}
                    </div>
                    {type === 'multiple_choice_question' && (
                        <>
                            <div className="mb-4">
                                <TextField
                                    id="outlined-basic"
                                    label="Đáp án đúng"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleCorrectAnswer}
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    id="outlined-basic"
                                    label="Đáp án sai"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleWrongAnswer1}
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    id="outlined-basic"
                                    label="Đáp án sai"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleWrongAnswer2}
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    id="outlined-basic"
                                    label="Đáp án sai"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleWrongAnswer3}
                                />
                            </div>
                        </>
                    )}

                    <div className="flex justify-end">
                        <Button variant="contained" color="primary" onClick={handleOnSubmit}>
                            Thêm câu hỏi
                        </Button>
                    </div>
                </form>
            </div>
        </CourseLayout>
    );
};

export default CreateQuestion;
