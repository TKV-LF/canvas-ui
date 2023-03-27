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

import courseApi from '~/services/api/course';

import CreateSource from './CreateSource';

const columns = [
	{ id: 'course', label: 'Course', minWidth: 170 },
	{ id: 'nickname', label: 'Nickname', minWidth: 100 },
	{
		id: 'term',
		label: 'Term',
		minWidth: 170,
		align: 'right',
		format: (value) => value.toLocaleString('en-US'),
	},
	{
		id: 'enrolled',
		label: 'Enrolled as',
		minWidth: 170,
		align: 'right',
		format: (value) => value.toLocaleString('en-US'),
	},
	{
		id: 'published',
		label: 'Published',
		minWidth: 170,
		align: 'right',
		format: (value) => value.toFixed(2),
	},
];

function createData(id, course, nickname, term, enrolled, published) {
	return { id, course, nickname, term, enrolled, published };
}

async function getData() {
	try {
		const data = await courseApi.getAllCourse();
		return data;
	} catch (error) {
		console.error(error); // Handle the error
	}
}

const Course = () => {
	const [course, setCourse] = useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	useEffect(() => {
		getData().then((data) => {
			let arr = [];
			data.map((item) => {
				arr.push(createData(item.id, item.name, item.nickname, item.term, item.name, item.is_public));
			});
			setCourse(arr);
		});
	}, []);

	return (
		<div>
			<CreateSource />
			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
									<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === 'number'
														? column.format(value)
														: value}
												</TableCell>
											);
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
	);
};

export default Course;
