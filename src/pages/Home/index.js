import React, { useEffect } from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';

const exampleData = [
	{
		id: 1,
		name: "This is a test course 1",
		code: "TEST",
		term: "Fall 2021",
		enrolled: "Student",
		published: "1",
		color: "green",
	},
	{
		id: 2,
		name: "This is a test course 2",
		code: "TEST",
		term: "Fall 2021",
		enrolled: "Student",
		published: "1",
		color: "red",
	},
	{
		id: 3,
		name: "This is a test course 3",
		code: "TEST",
		term: "Fall 2021",
		enrolled: "Student",
		published: "0",
		color: "yellow",
	},
	{
		id: 4,
		name: "This is a test course 4",
		code: "TEST",
		term: "Fall 2021",
		enrolled: "Student",
		published: "0",
		color: "#000000",
	},
	{
		id: 5,
		name: "This is a test course 5",
		code: "TEST",
		term: "Fall 2021",
		enrolled: "Student",
		published: "0",
		color: "#000000",
	}

]

const Home = () => {
	const [publishCourses, setPublishCourses] = useState([]);
	const [unpublishCourses, setUnpublishCourses] = useState([]);

	useEffect(() => {
		setPublishCourses(exampleData.filter((course) => course.published === "1"));
		setUnpublishCourses(exampleData.filter((course) => course.published === "0"));
	}, [exampleData]);
	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="flex flex-col">

				<Typography variant="h4" component="h1" gutterBottom>

					Breadcrumb
				</Typography>

			</div>
			<div className='mx-8'>
				<div className="grid grid-cols-1 mb-10">
					<div className="grid grid-cols-1 border-b mb-7 pb-1">
						<h2 className='text-2xl font-bold'>Publish Courses ({publishCourses.length})</h2>
					</div>
					<div className="grid grid-cols-5 gap-4">
						{
							publishCourses.map((course) => (
								<div key={course.id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow h-full">
									<div className={`h-[146px] bg-red-100 -mx-6 -mt-6`}>

									</div>
									<div className="h-2/5">
										<a href="#">
											<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{course.name}</h5>
										</a>
										<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{course.code}</p>
									</div>
								</div>
							))
						}
					</div>
				</div>
				<div className="grid grid-cols-1">
					<div className="grid grid-cols-1 border-b mb-7 pb-1">
						<h2 className='text-2xl font-bold'>Unpublished Courses ({unpublishCourses.length})</h2>
					</div>
					<div className="grid grid-cols-5 gap-4">
						{
							unpublishCourses.map((course) => (
								<div key={course.id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow h-full">
									<div className={`h-[146px] bg-red-100 -mx-6 -mt-6`}>

									</div>
									<div className="h-2/5">
										<a href="#">
											<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{course.name}</h5>
										</a>
										<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{course.code}</p>
									</div>
								</div>
							))
						}
					</div>
				</div>
			</div>

		</div>
	);
};

export default Home;
