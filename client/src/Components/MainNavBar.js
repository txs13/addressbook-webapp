import React from 'react'
import { CssBaseline, AppBar, Toolbar, Typography, MenuItem, TextField, Box } from '@mui/material'
import MenuBook from '@mui/icons-material/MenuBook'
import SearchIcon from '@mui/icons-material/Search'

import useNavBarStyles from './styles/mainNavBarStyles.js'


const MainNavBar = ({ searchSortValues, handleSearchSortInput, sortingOptions }) => {

    const classes = useNavBarStyles()

    return (
        <>
            <CssBaseline />
            <AppBar position="static" className={classes.navBar} >
                <Toolbar>
                    <MenuBook className={classes.iconHeader}/>

                    <Typography variant="h6" align="center" className={classes.appHeader}> 
                        AddressBook
                    </Typography>

                    <Box className={classes.searchBox}>
                        <Box className={classes.boxIcon}>
                            <SearchIcon />
                        </Box>

                        <TextField
                            className={classes.searchInput}
                            variant="standard"
                            placeholder="Search…"
                            value={searchSortValues.search}
                            onChange={handleSearchSortInput}
                            name="search"
                            autoComplete="off"
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />

                        <Box className={classes.boxLabel}>
                            <Typography>sort by</Typography>
                        </Box>

                        <TextField
                            className={classes.sortingInput}
                            select
                            variant="standard"
                            value={searchSortValues.sort}
                            onChange={handleSearchSortInput}
                            name="sort"
                            InputProps={{
                                disableUnderline: true
                            }}
                            >
                            {sortingOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}        
                        </TextField>        
                    </Box>    

                </Toolbar>
            </AppBar>
        </>
    )
}

export default MainNavBar