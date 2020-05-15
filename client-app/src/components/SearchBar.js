import React, { useRef } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/styles';
import { Grid, InputBase, Paper, Typography } from '@material-ui/core';

export function SearchBar({ redirect, updateSearchTerms, searchedTerms, isBookmark}) {
    const classes = useStyles();
    const textInput = useRef(null);

    const handleKeyPress = (event) => {
        let textInput = event.target.value;
        if (event.key === 'Enter') {
            let inputArray = [];
            if (textInput !== null && textInput !== '') {
                inputArray = textInput.split(',').map((searchTerm) => {
                    return searchTerm.trim();
                });
            }
            updateSearchTerms(inputArray);
            redirect();
        }
    };

    const clear = () => {
        textInput.current.children[0].value = '';
        updateSearchTerms([]);
    };

    return (
        <Paper className={classes.searchBackground}>
            <Grid
                container
                className={classes.container}
                direction='row'
                justify='flex-start'
                alignItems='center'
            >
                <SearchIcon />

                <InputBase
                    ref={textInput}
                    classes={classes}
                    placeholder={isBookmark ? 'Hit enter to search your bookmarks...' : 'Hit enter to search...'}
                    className='search-input'
                    label='search'
                    defaultValue={searchedTerms.length ? searchedTerms : ''}
                    onKeyPress={handleKeyPress}
                    autoFocus={true}
                />
                <Typography variant='button' className={classes.clearAll} onClick={clear}>
                    Clear
                </Typography>
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
        position: 'relative',
    },
    clearAll: {
        '&:hover': {
            textDecoration: 'underline',
        },
        fontSize: '8pt',
        cursor: 'pointer',
        color: 'gray',
        paddingTop: '4px',
        marginRight: '14px',
        right: '0px',
        position: 'absolute',
    },
});
