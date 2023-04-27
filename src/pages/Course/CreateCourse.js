import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, DialogTitle } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';

import { CourseApi } from '~/services/api';

const useStyles = makeStyles(() => ({
	dialog: {
		padding: '30px',
	},
	button: {
		backgroundColor: '#3f51b5',
		color: 'white',
		margin: '10px 0px 0px 15px',
		'&:hover': {
			backgroundColor: '#3f51b5',
			color: 'white',
		},
	},
	title: {
		padding: '0px !important',
		color: '#3f51b5',
	},
}));

const licenses = [
	{
		name: 'Private (Copyrighted)',
		id: 'private',
	},
	{
		name: 'Public Domain',
		id: 'public_domain',
	},
	{
		name: 'CC Atribution',
		id: 'cc_by',
	},
	{
		name: 'CC Atribution Share Alike',
		id: 'cc_by_sa',
	},
	{
		name: 'CC Atribution No Derivatives',
		id: 'cc_by_nd',
	},
	{
		name: 'CC Atribution Non Commercial',
		id: 'cc_by_nc',
	},
	{
		name: 'CC Atribution Non Commercial Share Alike',
		id: 'cc_by_nc_sa',
	},
	{
		name: 'CC Atribution Non Commercial No Derivatives',
		id: 'cc_by_nc_nd',
	},
];

export default function CreateCourseForm({ title, css }) {
	const classes = useStyles();
	const [name, setName] = useState('');
	const [license, setLicense] = useState('private');
	const [isPublic, setIsPublic] = useState(false);
	const [open, setOpen] = useState(false);

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleLicenseChange = (event) => {
		setLicense(event.target.value);
	};

	const handleIsPublicChange = (event) => {
		setIsPublic(event.target.checked);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const payload = {
			course: {
				name,
				courseCode: name,
				license,
				isPublic: isPublic,
				accountId: 1,
			},
		};
		try {
			const response = await CourseApi.createCourse(payload);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button variant="outlined" onClick={handleClickOpen} className={css}>
				{title}
			</Button>
			<Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialog }}>
				<DialogTitle classes={{ root: classes.title }}>Create a new course</DialogTitle>
				<form onSubmit={handleSubmit}>
					<TextField
						id="name"
						label="Name"
						autoFocus
						variant="standard"
						fullWidth
						sx={{ mb: 1 }}
						value={name}
						onChange={handleNameChange}
					/>
					<Select
						labelId="select-label"
						id="select"
						value={license}
						fullWidth
						sx={{ mb: 1 }}
						onChange={handleLicenseChange}
						label="Select an option"
					>
						{licenses.map((option) => (
							<MenuItem key={option.id} value={option.id}>
								{option.name}
							</MenuItem>
						))}
					</Select>
					<FormGroup>
						<FormControlLabel control={<Checkbox checked={isPublic} onChange={handleIsPublicChange} />} label="Public" />
					</FormGroup>
					<Button type="submit" variant="contained" classes={{ root: classes.button }}>
						Create Course
					</Button>
				</form>
			</Dialog>
		</div>
	);
}
