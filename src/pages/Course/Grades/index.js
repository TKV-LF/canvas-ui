import { useState, useEffect } from 'react';
import { Menu } from '~/components/Layouts';
import { Group, AssignmentsMenu } from '~/pages/Course/Assignments';
import { courseMenu } from '~/components/Menu';
import Grid from '@mui/material/Grid';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { CourseApi, GradeApi } from '~/services/api';
import { get } from 'store/dist/store.legacy.min';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function removeHtmlTags(str) {
    const temporaryElement = document.createElement('div');
    temporaryElement.innerHTML = str;
    return temporaryElement.textContent || temporaryElement.innerText || '';
}

async function getCourse(payload) {
    try {
        const data = await CourseApi.getCourse(payload);
        return data;
    } catch (error) {
        console.error(error); // Handle the error
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

async function getAssignments(payload) {
    try {
        const assignments = await CourseApi.getAssignments(payload);
        return assignments;
    } catch (error) {
        console.log(error);
    }
}

async function getGrade(payload) {
    try {
        const data = await GradeApi.getGradebookDays(payload);
        return data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}

const columns = [{ id: 'name', label: 'Tên học sinh' }];
const Grades = () => {
    const [course, setCourse] = useState();
    const [gradebook, setGradebook] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { id } = useParams();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        getGrade({ courseId: id }).then((data) => {
            data.map((item) => {
                item.graders.map((grader) => {
                    console.log(grader);
                });
            });
        });
        getAssignments({ courseId: id }).then((data) => {
            data.map((item) => {
                columns.push({
                    id: item.id,
                    label: removeHtmlTags(item.description),
                });
            });
        });
        getAssignmentGroups({ courseId: id }).then((data) => {
            data.map((item) => {
                columns.push({
                    id: item.id,
                    label: item.name,
                });
            });
        });
        getCourse({ courseId: id }).then((data) => {
            setCourse(data);
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
                        <Link underline="hover" color="inherit" to={`/courses/x${id}`}>
                            {course && course.name}
                        </Link>
                        <Typography color="text.primary">Điểm</Typography>
                    </Breadcrumbs>
                </div>
            </header>
            <div className="mx-8">
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Menu items={courseMenu} />
                    </Grid>
                    <Grid item xs={10}>
                        <Paper className="w-100 overflow-hidden mt-5">
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody></TableBody>
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
