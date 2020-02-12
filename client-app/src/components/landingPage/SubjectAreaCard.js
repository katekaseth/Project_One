import React from 'react';
import { Paper, CardContent, CardActionArea } from '@material-ui/core';

export function SubjectAreaCard({title, iconURl}) {
    return (
        <Paper square className='subject-area-card'>
            <CardActionArea className='subject-area-card'>
                <CardContent>
                    <img src={iconURl} />
                    <p className='subject-area-card-text'>
                        {title}
                    </p>
                </CardContent>
            </CardActionArea>
        </Paper>
    )
}