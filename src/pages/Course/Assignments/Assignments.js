import React from 'react';
import Typography from '@mui/material/Typography';
import { Menu } from '~/components/Layouts';
import Group from './Group';
import { courseMenu } from '~/components/Menu';

const groups = [
	{
		id: '1',
		name: 'Group 1',
		date: '25-May-2020',
		assignments: [
			{
				id: '1',
				name: 'Assignment 1',
				// Assigned_To: 'Beltran',
				// Assignee: 'Romona',
				// Status: 'To-do',
				// Priority: 'Low',
				Due_Date: '25-May-2020',
			},
			{
				id: '2',
				name: 'Assignment 2',
				// Assigned_To: 'Dave',
				// Assignee: 'Romona',
				// Status: 'To-do',
				// Priority: 'Low',
				Due_Date: '26-May-2020',
			}
		]
	},
	{
		id: '2',
		name: 'Group 2',

		date: '26-May-2020',
		assignments: [
			{
				id: '3',
				name: 'Assignment 3',
				// Assigned_To: 'Beltran',
				// Assignee: 'Romona',
				// Status: 'To-do',
				// Priority: 'Low',
				Due_Date: '25-May-2020',
			},
			{
				id: '4',
				name: 'Assignment 4',
				// Assigned_To: 'Dave',
				// Assignee: 'Romona',
				// Status: 'To-do',
				// Priority: 'Low',
				Due_Date: '26-May-2020',
			}
		]
	}
];

const Assignments = () => {

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
						<Menu items={courseMenu} />
					</div>
					<div className="mb-7 pb-1 w-100 col-span-5">
						<div className="col-span-3">
							<Group data={groups} />
						</div>
					</div>
				</div>

			</div>

		</div>
	);
}
export default Assignments;
