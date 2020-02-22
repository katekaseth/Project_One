import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, InputBase } from '@material-ui/core';

export function SearchBar({setPage}) {

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            setPage.search();
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
                    placeholder="Hit enter to search..."
                    className="search-input"
                    label="search"
                    onKeyPress={handleKeyPress}
                />
            </Grid>
        </Grid>
    )
}
