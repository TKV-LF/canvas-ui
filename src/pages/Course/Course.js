import React from 'react';
import Typography from '@mui/material/Typography';
import { Menu } from '~/components/Layouts';
import { Group, AssignmentsMenu } from '~/pages/Course/Assignments';
import { courseMenu } from '~/components/Menu';
import Grid from '@mui/material/Grid';

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

const Course = () => {
	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="flex flex-col">

				<Typography variant="h4" component="h1" gutterBottom>

					Breadcrumb
				</Typography>

			</div>
			<div className='mx-8'>
				<Grid container spacing={2}>
					<Grid item xs={2}>
						<Menu items={courseMenu} />
					</Grid>
					<Grid item xs={8}>
						<Grid item xs={12}>
							<AssignmentsMenu />
						</Grid>
						<Grid item xs={12}>
							<Group data={groups} />
						</Grid>
					</Grid>
					<Grid item xs={2}>
						<Menu items={courseMenu} />
					</Grid>
				</Grid>
			</div>
		</div>

	);
};

export default Course;
