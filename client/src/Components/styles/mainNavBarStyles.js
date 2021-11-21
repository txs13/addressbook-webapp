import { makeStyles } from "@mui/styles"
import { alpha } from '@mui/material'

const useNavBarStyles = makeStyles((theme)=>({
    iconHeader: {
        marginRight: '15px'
    },
    navBar: {
        [theme.breakpoints.up('md')]: {
            height: '60px'
        }, 
    },
    searchBox: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row'
    },
    boxIcon:{
        padding: theme.spacing(0, 2),
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            transition: theme.transitions.create('width'),    
            color: theme.palette.common.white,
            borderBottom: 'none',
        },
    },
    boxLabel: {
        padding: theme.spacing(0, 1),
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: theme.spacing(10)
    },
    sortingInput: {
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            transition: theme.transitions.create('width'),    
            color: theme.palette.common.white,
            borderBottom: 'none',
            width: theme.spacing(15)             
        },
        '& .MuiSelect-iconStandard': {
            color: theme.palette.common.white,
        },     
    },
    appHeader: {
        [theme.breakpoints.only('xs')]: {
            display: 'none'
        },

    }
}))

export default useNavBarStyles