import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { FormDialog } from '~/components/Form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CourseApi } from '~/services/api';

const AssignmentsMenu = () => {

	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
	});

	const handleFormSubmit = async () => {
		try {
			console.log(formData);
			const response = await CourseApi.createAssignmentGroup(formData);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<div className='flex border-b border-[#c7cdd1] mb-6 pb-3'>
			<div className='flex flex-col w-1/6'>
				<TextField id="outlined-basic" label="Search for Assignment" variant="outlined" />
			</div>
			<div className='flex flex-col w-5/6'>
				<div className='flex justify-end'>
					<div>
						<Button variant="contained" onClick={() => setOpen(true)}>
							<AiOutlinePlus /> Group
						</Button>
						<FormDialog
							open={open}
							onClose={() => setOpen(false)}
							onSubmit={handleFormSubmit}
							title="Add new group"
							fields={[
								{
									label: "Name",
									name: "name",
									type: "text",
									required: true,
									value: formData.name,
									onChange: handleInputChange,
								}
							]}
						/>
					</div>
					<div>

						<Link to="#"><Button variant="outlined"><AiOutlinePlus /> Assginment</Button></Link>
					</div>
				</div>
			</div>
		</div>
	)
};
export default AssignmentsMenu;
