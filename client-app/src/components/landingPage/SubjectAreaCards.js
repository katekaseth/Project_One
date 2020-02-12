import React from 'react';
import { Grid } from '@material-ui/core';

import { SubjectAreaCard } from './SubjectAreaCard';
import { FaGraduationCap, FaMicroscope, FaCogs } from "react-icons/fa";

export  function SubjectAreaCards() {
    return (
        <Grid
            container
            spacing={4}
            xs={10}
            justify='center'
        >
            <Grid 
                container 
                item 
                justify='center'
                spacing={4}
            >
                <Grid item>
                    <SubjectAreaCard title='Academics' Icon={FaGraduationCap}/>
                </Grid>
                <Grid item>
                    <SubjectAreaCard title='Research' Icon={FaMicroscope}/>
                </Grid>
                <Grid item>
                    <SubjectAreaCard title='University Advancement' Icon={FaMicroscope}/>
                </Grid>
            </Grid>
            <Grid 
                container 
                item 
                justify='center'
                spacing={4}
            >
                <Grid item>
                    <SubjectAreaCard title='Finance' Icon={FaGraduationCap}/>
                </Grid>
                <Grid item>
                    <SubjectAreaCard title='Human Resources' Icon={FaMicroscope}/>
                </Grid>
                <Grid item>
                    <SubjectAreaCard title='Services & Resources' Icon={FaCogs}/>
                </Grid>
            </Grid>
        </Grid>
    )
}