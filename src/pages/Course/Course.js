import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Menu } from '~/components/Course';




const Course = ({children}) => {
	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="flex flex-col">

				<Typography variant="h4" component="h1" gutterBottom>

					Breadcrumb
				</Typography>

			</div>
			<div className='mx-8'>
				<div className="grid grid-cols-6 mb-10">
					<div className="col-span-1 mb-7 pb-1">
						<Menu />
					</div>
					<div className="mb-7 pb-1 w-100 col-span-5">
						<h2 className='text-2xl font-bold'>Publish Courses</h2>
						{children}
					</div>

				</div>

			</div>

		</div>
	);
};

export default Course;
