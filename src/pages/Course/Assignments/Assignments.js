import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
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
                <Typography variant="h4" component="h1" gutterBottom>
                    Breadcrumb
                </Typography>
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
