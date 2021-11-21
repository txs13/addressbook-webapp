import { makeStyles } from "@mui/styles"

const useAppStyles = makeStyles((theme)=>({
    footer: {
        backgroundColor: theme.palette.primary.main,
        padding: '10px 15px 10px',
        [theme.breakpoints.up('md')]: {
            height: '60px'
        } 
    },

    contactsPanel: {
        width: "100%",
    
    },

    contactDetailsPanel: {

    },

    mainFrame: {

    },

    wholeApp: {

    }

}))

export default useAppStyles