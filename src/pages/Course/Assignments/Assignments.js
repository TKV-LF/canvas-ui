import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Menu } from '~/components/Layouts';
import Group from './Group';
import AssignmentsMenu from './AssignmentsMenu';
import { COURSE_MENU } from '~/constants';
import { CourseApi } from '~/services/api';

async function getAssignmentGroups(payload) {
    try {
        const data = await CourseApi.getAssignmentGroups(payload);
        
        return data;
    } catch (error) {
        console.log(error);
    }
}

const Assignments = () => {
    const [items, setItems] = useState([]);
    const { courseId } = useParams();

    useEffect(() => {
        let payload = {
            courseId: courseId,
        };

        getAssignmentGroups(payload).then((data) => {
            setItems(data);
        });
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
                <header className="bg-white shadow ">
                    <div className="max-w-7xl py-6 sm:px-6 lg:px-8">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" to="/dashboard">
                                Trang chủ
                            </Link>
                            <Link underline="hover" color="inherit" to="/courses">
                                Tất cả khoá học
                            </Link>
                        </Breadcrumbs>
                    </div>
                </header>
            </div>
            <div className="mx-8">
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Menu items={COURSE_MENU} />
                    </Grid>
                    <Grid item xs={10}>
                        <Grid item xs={12}>
                            {items ? (
                                <AssignmentsMenu courseId={courseId} assignmentGroups={items} />
                            ) : (
                                console.log('loading...')
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {items ? <Group courseId={courseId} assignmentGroups={items} /> : <div>Loading...</div>}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};
export default Assignments;
