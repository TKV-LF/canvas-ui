import { useState } from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { FormDialog } from '~/components/Form';

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

export default function CreateCourseForm() {
    const [name, setName] = useState('');
    const [license, setLicense] = useState('private');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleLicenseChange = (event) => {
        setLicense(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            course: {
                name,
                course_code: name,
                sis_course_id: name,
            },
        };

        try {
            const response = await axios.post('/api/courses', payload);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormDialog title="Create source">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={handleNameChange}
                />
                <Select
                    labelId="select-label"
                    id="select"
                    value={license}
                    fullWidth
                    onChange={handleLicenseChange}
                    label="Select an option"
                >
                    {licenses.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
                <Button type="submit" variant="contained" color="primary">
                    Create Course
                </Button>
            </form>
        </FormDialog>
    );
}
