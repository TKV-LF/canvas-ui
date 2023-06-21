import { useState, useEffect } from 'react';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

import { CourseApi } from '~/services/api';

import CreateCourse from './CreateCourse';
import { notification } from 'antd';

const columns = [
    { id: 'course', label: 'Khoá học', minWidth: 170 },
    { id: 'nickname', label: 'Biệt danh', minWidth: 100 },
    {
        id: 'term',
        label: 'Học kỳ',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'enrolled',
        label: 'Vai trò',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'published',
        label: 'Công khai',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'action',
        label: '',
        minWidth: 30,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

function createData(id, course, nickname, term, enrolled, published) {
    return { id, course, nickname, term, enrolled, published };
}

async function getData() {
    try {
        const data = await CourseApi.getAllCourse();
        return data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}

async function deleteCourse(payload) {
    try {
        const response = await CourseApi.deleteCourse(payload);
        return response;
    } catch (error) {
        console.error(error); // Handle the error
    }
}

const ListCourse = () => {
    const [course, setCourse] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteCourseHandle = (id) => {
        let payload = {
            courseId: id,
        };
        deleteCourse(payload).then((res) => {
            notification.success({
                message: `Xoá khoá học có id là ${id}`,
            });
            window.location.href = `/courses`;
        });
    };
    useEffect(() => {
        getData().then((data) => {
            let arr = [];
            data.forEach((item) => {
                arr.push(createData(item.id, item.name, item.nickname, item.term, item.name, item.is_public));
            });
            setCourse(arr);
        });
    }, []);
    return (
        <div>
            <header className="bg-white shadow ">
                <div className="max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/dashboard">
                            Trang chủ
                        </Link>
                        <Typography color="text.primary">Tất cả khoá học</Typography>
                    </Breadcrumbs>
                </div>
            </header>
            <div className="mx-16 mt-5">
                <CreateCourse title="Tạo khoá học" />
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
                            <TableBody>
                                {course.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                            className="cursor-pointer"
                                        >
                                            {columns.map((column) => {
                                                if (column.id != 'action') {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            <Link to={`/courses/${row.id}`}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </Link>
                                                        </TableCell>
                                                    );
                                                } else {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            <FaTrashAlt onClick={() => deleteCourseHandle(row['id'])} />
                                                        </TableCell>
                                                    );
                                                }
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 25, 100]}
                        component="div"
                        count={course.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
};

export default ListCourse;
