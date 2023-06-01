import React from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Menu } from '~/components/Layouts';
import Group from './Group';
import AssignmentsMenu from './AssignmentsMenu';
import { courseMenu } from '~/components/Menu';

const Assignments = () => {
    const { id } = useParams();
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
                        <Menu items={courseMenu} />
                    </Grid>
                    <Grid item xs={10}>
                        <Grid item xs={12}>
                            <AssignmentsMenu courseId={id} />
                        </Grid>
                        <Grid item xs={12}>
                            <Group courseId={id} />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};
export default Assignments;
