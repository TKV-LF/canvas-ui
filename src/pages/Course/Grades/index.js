import { useState, useEffect } from 'react';
import { Menu } from '~/components/Layouts';
import { COURSE_MENU } from '~/constants';
import Grid from '@mui/material/Grid';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { CourseApi, GradeApi } from '~/services/api';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { set } from 'store';
import { parse } from 'qs';

async function getCourse(payload) {
    try {
        const data = await CourseApi.getCourse(payload);
        return data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}
async function getAssignments(payload) {
    try {
        const assignments = await CourseApi.getAssignments(payload);
        return assignments;
    } catch (error) {
        console.log(error);
    }
}

async function getAssignmentGroups(payload) {
    try {
        const data = await CourseApi.getAssignmentGroups(payload);
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getEnrollments(payload) {
    try {
        const data = await CourseApi.listEnrollments(payload);
        return data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}

async function listUncollatedSubmissionVersions(payload) {
    try {
        const data = await GradeApi.listUncollatedSubmissionVersions(payload);
        return data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}

const mapGroupById = (groups) => groups.reduce((acc, group) => ({ ...acc, [group.id]: group }), {});

const Grades = () => {
    const [course, setCourse] = useState();
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { courseId } = useParams();
    const [page, setPage] = useState(0);
    const [grades, setGrades] = useState([]);
    const [columns, setColumns] = useState([{ id: 'name', label: 'Tên' }]);
    const [assignmentGroups, setAssignmentGroups] = useState([]);
    const [totalGroupWeight, setTotalGroupWeight] = useState(0);
    const [enrollments, setEnrollments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [allSubmissions, setAllSubmissions] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [processedGroups, setProcessedGroups] = useState([]);
    const [enrollmentsWithGroup, setEnrollmentsWithGroup] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        setEnrollments([]);
        setSubmissions([]);
        setTotalGroupWeight(0);
        setAssignments([]);
        setColumns([]);
        let allEnrollments = [];

        listUncollatedSubmissionVersions({ courseId: courseId }).then((res) => {
            let group = [];
            res.forEach((item) => {
                if (!group[item.user_id]) {
                    group[item.user_id] = [];
                }
                group[item.user_id].push({
                    assignment_id: item.assignment_id,
                    score: item.score,
                    user_id: item.user_id,
                    user_name: item.user_name,
                });
            });
            group.filter((n) => n);
            setSubmissions(group);
        });
        getAssignments({ courseId: courseId }).then((data) => {
            const newColumns = data.map((item) => ({
                id: item.id,
                label: item.name,
                isAssignment: true,
                assignment_id: item.id,
            }));

            setColumns(newColumns);
            setAssignments(data);
        });

        getEnrollments({ courseId: courseId }).then((res) => {
            res.data.forEach((item) => {
                if (item.enrollment_state == 'active') {
                    setEnrollments((oldEnrollments) => [...oldEnrollments, item]);
                }
            });
            allEnrollments = res.data;
        });
        getCourse({ courseId: courseId }).then((data) => {
            setCourse(data);
        });

        getAssignmentGroups({ courseId: courseId }).then(async (data) => {
            const getAssignmentWeight = (id) => {
                return parseInt(
                    localStorage.getItem('assignment_' + id) ? localStorage.getItem('assignment_' + id) : 0,
                );
            };

            const getTotalAssignmentWeight = (assignments) =>
                assignments.reduce((acc, a) => acc + a.assginment_weight, 0);
            const getHighestAssignmentScore = (submissions) => {
                if (!submissions.length) {
                    return 0;
                }

                return Math.max(...submissions.map((s) => s.score));
            };

            const getGroupWithAssignments = (assignments) =>
                data.map((group) => {
                    const thisGroupAssignments = assignments
                        .filter((a) => a.assignment_group_id === group.id)
                        .map((a) => ({ ...a, assginment_weight: getAssignmentWeight(a.id) }));

                    const groupWithoutScore = {
                        ...group,
                        assignments: thisGroupAssignments,
                        total_assignment_weight: getTotalAssignmentWeight(thisGroupAssignments),
                    };

                    const score = getGroupScore(groupWithoutScore);

                    return {
                        ...groupWithoutScore,
                        score,
                    };
                });

            const getSubmissionsOfAssignment = (userId, assignment, submissions) =>
                submissions.filter((s) => userId == s.user_id && s.assignment_id === assignment.id);

            const getAssignmentsWithSubmissions = (userId, assignments, submissions) =>
                assignments.map((assignment) => {
                    const submissionsOfAssignment = getSubmissionsOfAssignment(userId, assignment, submissions);

                    return {
                        ...assignment,
                        submissions: submissionsOfAssignment,
                        score: getHighestAssignmentScore(submissionsOfAssignment),
                    };
                });

            const getAssignmentScoreWithWeight = (assignment) => {
                return assignment.score * assignment.assginment_weight;
            };

            const getGroupScore = (group) => {
                const scoresWithWeight = group.assignments.map(getAssignmentScoreWithWeight);

                const totalScoreWithWeight = scoresWithWeight.reduce((acc, s) => acc + s, 0);

                return Number((totalScoreWithWeight / group.total_assignment_weight).toFixed(1));
            };

            const allAssignments = await getAssignments({ courseId });
            const allSubmissions = await listUncollatedSubmissionVersions({ courseId });
            const getTotalGroupWeight = (groups) => groups.reduce((acc, g) => acc + g.group_weight, 0);

            const allEnrollmentsWithGroup = allEnrollments.map((enrollment) => {
                const groupsWithAssignments = getGroupWithAssignments(
                    getAssignmentsWithSubmissions(enrollment.user_id, allAssignments, allSubmissions),
                );

                const totalScore = groupsWithAssignments.reduce(
                    (score, group) =>
                        score + (group.score * group.group_weight) / getTotalGroupWeight(groupsWithAssignments),
                    0,
                );

                return {
                    ...enrollment,
                    groups: groupsWithAssignments,
                    total_score: Number(totalScore.toFixed(1)),
                    totalWeight: getTotalGroupWeight(groupsWithAssignments),
                };
            });

            const processedGroups = data.map((group) => ({
                ...group,
                assignments: allAssignments.filter((a) => a.assignment_group_id === group.id),
            }));

            setProcessedGroups(processedGroups);
            setEnrollmentsWithGroup(allEnrollmentsWithGroup);

            console.log('ggeeee', allEnrollmentsWithGroup);

            setAssignmentGroups(data);
        });
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4">
            <header className="bg-white shadow ">
                <div className="max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/dashboard">
                            Trang chủ
                        </Link>
                        <Link underline="hover" color="inherit" to="/courses">
                            Tất cả khoá học
                        </Link>
                        <Link underline="hover" color="inherit" to={`/courses/${courseId}`}>
                            {course && course.name}
                        </Link>
                        <Typography color="text.primary">Điểm</Typography>
                    </Breadcrumbs>
                </div>
            </header>
            <div className="mx-8">
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Menu items={COURSE_MENU} />
                    </Grid>
                    <Grid item xs={10}>
                        <Paper className="w-100 overflow-hidden mt-5">
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tên</TableCell>
                                            {processedGroups.map((group) => (
                                                <>
                                                    {group.assignments.map((assignment) => (
                                                        <TableCell key={'assignment' + assignment.id}>
                                                            {assignment.name}
                                                        </TableCell>
                                                    ))}
                                                    <TableCell key={'group' + group.id}>
                                                        {'[Nhóm] ' + group.name}
                                                    </TableCell>
                                                </>
                                            ))}

                                            <TableCell>Tổng điểm</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {enrollmentsWithGroup.map((enrollment) => (
                                            <TableRow key={enrollment.user_id}>
                                                <TableCell key="name">{enrollment.user.name}</TableCell>
                                                {enrollment.groups.map((group) => (
                                                    <>
                                                        {group.assignments.map((assignment) => (
                                                            <TableCell key={'assignment' + assignment.id}>
                                                                {assignment.score}
                                                            </TableCell>
                                                        ))}
                                                        <TableCell key={'group' + group.id}>{group.score}</TableCell>
                                                    </>
                                                ))}
                                                <TableCell key="total-score">{enrollment.total_score}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 25, 100]}
                                component="div"
                                count={10}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Grades;
