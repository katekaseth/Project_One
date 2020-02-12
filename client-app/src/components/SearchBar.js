import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, InputBase } from '@material-ui/core';

export function SearchBar() {

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            alert('You searched for something!')
        }
    }

    return (
        <Grid 
            container 
            direction='row'
            justify='flex-start'
            alignItems='center'
            className='search-bar'>
            <Grid item>
                <SearchIcon/>
            </Grid>
            <Grid item xs>
                <InputBase
                    xs
                    multiline
                    placeholder="Hit enter to search..."
                    className="search-input"
                    label="search"
                    onKeyPress={handleKeyPress}
                />
            </Grid>
        </Grid>
    )
}
