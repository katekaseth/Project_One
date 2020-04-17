import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/styles';
import { Grid, InputBase, Paper } from '@material-ui/core';

export function SearchBar({ setPage, updateSearchTerms, searchedTerms }) {
    const classes = useStyles();

    const handleKeyPress = (event) => {
        let textInput = event.target.value;
        if (event.key === 'Enter') {
            let inputArray = textInput.split(',').map((searchTerm) => {
                return searchTerm.trim();
            });
            updateSearchTerms(inputArray);
            setPage.search();
        }
    };

    return (
        <Paper className={classes.searchBackground}>
            <Grid container direction='row' justify='flex-start' alignItems='center'>
                <SearchIcon />

                <InputBase
                    classes={classes}
                    placeholder='Hit enter to search...'
                    className='search-input'
                    label='search'
                    defaultValue={searchedTerms.length ? searchedTerms : ''}
                    onKeyPress={handleKeyPress}
                    autoFocus={true}
                />
            </Grid>
        </Paper>
    );
}

const useStyles = makeStyles({
    root: {
        width: '95%',
    },
    searchBackground: {
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '100px',
        height: '32px',
    },
});
